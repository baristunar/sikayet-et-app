import moment from "moment";
moment.updateLocale("en", {
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    ss: "%d saniye",
    m: "1 dakika",
    mm: "%d dakika",
    h: "1 saat",
    hh: "%d saat",
    d: "1 gün",
    dd: "%d gün",
    w: "1 hafta",
    ww: "%d hafta",
    M: "1 ay",
    MM: "%d ay",
    y: "1 ay",
    yy: "%d ay"
  }
});
const helperMixin = {
  methods: {
    timesAgo(time) {
      return moment(time).fromNow();
    },
    // "2021-01-16T08:18:23.519Z" => 1610785103519
    orderCreatedAtByASC(a, b) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  }
};

export default helperMixin;
