(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{341:function(t,a,r){"use strict";r.r(a);var e=r(0),v=Object(e.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"kafka的数据重复和丢失问题"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kafka的数据重复和丢失问题"}},[t._v("#")]),t._v(" kafka的数据重复和丢失问题")]),t._v(" "),r("p"),r("div",{staticClass:"table-of-contents"},[r("ul",[r("li",[r("a",{attrs:{href:"#producer角度"}},[t._v("producer角度")])]),r("li",[r("a",{attrs:{href:"#consumer角度"}},[t._v("consumer角度")]),r("ul",[r("li",[r("a",{attrs:{href:"#再平衡"}},[t._v("再平衡")])])])]),r("li",[r("a",{attrs:{href:"#重复数据的处理"}},[t._v("重复数据的处理")])]),r("li",[r("a",{attrs:{href:"#丢失数据的处理"}},[t._v("丢失数据的处理")])]),r("li",[r("a",{attrs:{href:"#总结"}},[t._v("总结")])])])]),r("p"),t._v(" "),r("h2",{attrs:{id:"producer角度"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#producer角度"}},[t._v("#")]),t._v(" producer角度")]),t._v(" "),r("p",[t._v("producer有一个ack配置，默认是1，可配置为：")]),t._v(" "),r("ul",[r("li",[t._v("0，无需服务端ack，相当于at most once。")]),t._v(" "),r("li",[t._v("1，服务端leader ack。即使leader ack了，仍然可能丢失数据，例如leader在把数据复制到replication之前挂了。")]),t._v(" "),r("li",[t._v("2，服务端leader、replication都ack，这种最可靠，可以保障数据不丢失，相当于at least once。")])]),t._v(" "),r("p",[t._v("如果ack配置为1，却没有收到leader ack，producer会自动重发数据。但是这里要分两种情况，一种是leader重选举，这时重发没有问题；\n另一种是网络故障，leader事实上收到了数据，这时重发就会导致数据重复。")]),t._v(" "),r("h2",{attrs:{id:"consumer角度"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#consumer角度"}},[t._v("#")]),t._v(" consumer角度")]),t._v(" "),r("ul",[r("li",[t._v("consumer pull数据之后如果是auto commit，后续交给线程池处理数据时发生异常，则存在数据丢失的情况。")]),t._v(" "),r("li",[t._v("如果consumer选择手动commit，例如线程池在处理完数据之后再commit，则可以避免发生数据丢失。但如果中间发生异常而没有走到commit，下次就会拉取到重复的数据。")])]),t._v(" "),r("p",[t._v("auto commit处理速度可以更快，因为收到数据后可以立即交给线程池处理，不必等待一批数据处理完成，但是数据丢失的风险容忍度往往很低，因此这种方案不可取。")]),t._v(" "),r("p",[r("strong",[t._v("建议总是在数据处理之后再commit，这样数据不会丢失，而commit频率是性能和重复消息之间的权衡。")]),t._v("\n比如极端情况下每处理完一条数据就马上commit，这样数据重复的概率非常低，但性能会下降。")]),t._v(" "),r("p",[t._v("但即使是每处理一条消息就commit，仍然可能有少量数据重复问题，因为这是一个两步操作，第一步处理成功了，第二步commit可能失败。")]),t._v(" "),r("p",[t._v("在线程池commit之前，拉取数据的线程会暂停消费数据，但仍然会和服务端保持心跳。如果consumer仅仅消费一个{topic, partition}，使用线程池其实没有提高性能的效果，它相比于单线程拉数据、处理数据的好处在于防止单线程处理过慢影响心跳包的发送。")]),t._v(" "),r("h3",{attrs:{id:"再平衡"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#再平衡"}},[t._v("#")]),t._v(" 再平衡")]),t._v(" "),r("p",[t._v("当下述几种情况发生时，会发生再平衡（《kafka权威指南P51》）：")]),t._v(" "),r("ul",[r("li",[t._v("一个新的消费者加入")]),t._v(" "),r("li",[t._v("一个消费者关闭或崩溃")]),t._v(" "),r("li",[t._v("主题的分区数发生变更")])]),t._v(" "),r("p",[t._v("发生再平衡时，消费者可能会分配到不同的分区，消费者需要读取该分区最后一次提交的偏移量，从那里开始继续处理。")]),t._v(" "),r("p",[t._v("根据消费者commit offset的策略，再平衡时有可能造成数据的重复和丢失。（《kafka权威指南P58》）")]),t._v(" "),r("p",[t._v("正如前文所述，一般生产环境都是手动commit，所以再平衡一般是造成数据重复。")]),t._v(" "),r("h2",{attrs:{id:"重复数据的处理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#重复数据的处理"}},[t._v("#")]),t._v(" 重复数据的处理")]),t._v(" "),r("p",[t._v("生产者数据重复：")]),t._v(" "),r("ul",[r("li",[t._v("一种情况是消息里本身就有唯一标识符；kafka从0.11.0.0版本开始支持"),r("strong",[t._v("幂等发送")]),t._v("，原理是用服务端给producer分配的Id+消息的sequence number来组成唯一标识。")]),t._v(" "),r("li",[t._v("还有一种情况是消息本身是幂等的，数据重复不影响业务逻辑，例如“这个账号里有100块”就是幂等的，“给这个账号加上20块”则不是幂等的。")])]),t._v(" "),r("p",[t._v("消费者数据重复：")]),t._v(" "),r("ul",[r("li",[t._v("最简单的办法是"),r("strong",[t._v("幂等性写入")]),t._v("。比如，可以用topic、partition、offset来构造一个数据库唯一键，重复数据插入时会报异常；")]),t._v(" "),r("li",[t._v("第二种是利用数据库的事务。参考《kafka权威指南P65》，不再commit offset到kafka，而是commit到支持事务的数据库，将消息写入和offset commit作为一个事务执行。同时，要实现再平衡监听器，在再平衡之前及时commit，在再平衡之后seek到正确的offset。")])]),t._v(" "),r("p",[t._v("如果是线程池场景，对再平衡监听器的实现可能会比较麻烦，要等待各个worker线程把任务处理完。一个思路是调线程池的shutdown()方法和awaitTermination()方法，后者在所有任务都处理完后才会执行。当然调了shutdown之后线程池就不能用了，需要重新new一个。")]),t._v(" "),r("h2",{attrs:{id:"丢失数据的处理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#丢失数据的处理"}},[t._v("#")]),t._v(" 丢失数据的处理")]),t._v(" "),r("ul",[r("li",[t._v("producer的ack参数配置为2；")]),t._v(" "),r("li",[t._v("consumer在处理完数据后再commit offset。")])]),t._v(" "),r("h2",{attrs:{id:"总结"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),r("p",[t._v("实际场景一般选择容忍数据重复，不能容忍数据丢失，也就是at least once。如果想要exactly once，需要注意的点还是挺多的。")])])}),[],!1,null,null,null);a.default=v.exports}}]);