function flightFormatter(t, e) {
    var i = this
      , n = i.isIntl
      , r = 1
      , a = t.map(function(t) {
        var a = t.mutilstn
          , s = a[0]
          , o = a[a.length - 1]
          , l = Date.from(s.dateinfo.ddate)
          , c = Date.from(o.dateinfo.adate)
          , d = {
            id: r++,
            dflg: s,
            aflg: o,
            departDate: l.format("MM月dd日"),
            departWeek: l.format("ee"),
            departHour: l.getHours(),
            arrivalHour: c.getHours(),
            departTimestamp: l.getTime(),
            lastArrivalTimestamp: c.getTime(),
            arrivalTimestamp: Date.from(s.dateinfo.adate).getTime(),
            departTime: l.format("HH:mm"),
            departAirport: s.dportinfo.aportsname + (s.dportinfo.bsname || ""),
            arrivalTime: c.format("HH:mm"),
            arrivalAirport: o.aportinfo.aportsname + (o.aportinfo.bsname || ""),
            policyinfo: t.policyinfo,
            mutilstn: a,
            transferCount: a.length,
            pain: t.painindex,
            fltoday: t.fltoday || 0,
            comlist: (t.mutilstn[0] && t.mutilstn[0].comlist || []).filter(function(t) {
                return t.stip
            }),
            duringtime: (c.getTime() - l.getTime()) / 1e3 / 60 || 0
        };
        n && (d.duration = t.duration,
        d.departAirport = i.ellipsis_txt(d.departAirport, 5, 4),
        d.arrivalAirport = i.ellipsis_txt(d.arrivalAirport, 5, 4),
        /// aaaaaa
        t.policyinfo.forEach(function(t) {
            var e = t.priceinfo;
            void 0 !== e && (e = e[0],
            t.tax = e.tax >> 0,
            t.price = e.price >> 0,
            t.tprice = t.price + (t.tax < 0 ? 0 : t.tax),
            t.drate = e.drate,
            t.quantity = e.ticket,
            t.sort = e.attr && e.attr.sort)
        })),
        i.updatePolicy(d);
        var f = t.policyinfo.slice(0);
        d.lprice = i.getLowPrice(f, "tprice"),
        n && (d.lsprice = i.getLowPrice(f, "price"),
        d.sort = i.getLowPrice(f, "sort")),
        f = d.policy;
        var p = []
          , m = []
          , u = !1;
        1 === e && a.length > 1 && (u = !0,
        t.istrain ? void 0 === i.tCityMap[t.trainCityCode] && (i.tCityMap[t.trainCityCode] = t.trainCity) : void 0 === i.tCityMap[s.aportinfo.city] && (i.tCityMap[s.aportinfo.city] = s.aportinfo.cityname));
        var h = []
          , g = !1;
        if (a.forEach(function(r) {
            if (r.istrain)
                m.push(f.train.tnumber),
                p.push(f.train.ttype + " " + f.train.seat),
                h.push(i.time2str(f.train.totaltime));
            else if (m.push(r.basinfo.flgno),
            t.istrain)
                p.push(r.basinfo.airsname + " " + f.classinfor[0].display);
            else {
                var a = 1 === i.ftype && r.craftinfo && r.craftinfo.kind && !u ? " (" + r.craftinfo.kind + "机型)" : ""
                  , s = "";
                r.basinfo.ishared && (g = !0,
                s = n ? "" : " 共享"),
                p.push({
                    desc: r.basinfo.airsname + r.basinfo.flgno + a + s,
                    aircode: r.basinfo.aircode
                }),
                1 === e && (void 0 === i.airlineMap[r.basinfo.aircode] && (i.airlineMap[r.basinfo.aircode] = r.basinfo.airsname),
                void 0 === i.airportMap[r.dportinfo.aport] && (i.airportMap[r.dportinfo.aport] = r.dportinfo.cityname + "-" + r.dportinfo.aportsname),
                void 0 === i.airportMap[r.aportinfo.aport] && (i.airportMap[r.aportinfo.aport] = r.aportinfo.cityname + "-" + r.aportinfo.aportsname))
            }
        }),
        h.length > 0 && (p = p.concat(h)),
        n && (p.length > 1 && (p.splice(1),
        p[0].desc += "...等"),
        g && (p[0].desc += " 共享"),
        "number" == typeof t.duration && p.push({
            type: "duration",
            desc: i.time2str(t.duration)
        })),
        m.push(l.getTime()),
        m = m.join(""),
        d.isShare = g,
        d.visited = i.visited(m),
        d.key = m,
        d.planes = p,
        d.istrain = !!t.istrain,
        d.istrain)
            d.trainCity = t.trainCity,
            d.tag = t.tag,
            d.free = 1 === t.muflag,
            1 == d.tag ? (d.arrivalAirport = f.train.asname + "站",
            d.departAirport = s.dportinfo.cityname + d.departAirport) : (d.arrivalAirport = o.aportinfo.cityname + d.arrivalAirport,
            d.departAirport = f.train.dsname + "站");
        else {
            d.hasStop = !1;
            var v = a.length;
            v > 1 ? (d.hasStop = !0,
            d.transferCity = n && v > 2 ? v - 1 + "次" : s.aportinfo.cityname) : (s.isstop || s.fsitem && s.fsitem.length) && (d.hasStop = !0,
            d.tnote = s.tnote || "",
            s.fsitem && s.fsitem.length && (d.stopCity = s.fsitem[0].city))
        }
        return d
    });
    return this.isIntl || i.$nextTick(function() {
        i.setSortInFlist("price"),
        i.setSortInFlist("duringtime")
    }),
    a
}
function ellipsis_txt(t, e, i) {
    return t += "",
    t.length > e ? t.substr(0, i || e) + "..." : t
}
function updatePolicy(t) {
    var e = this
      , i = t.policyinfo.filter(function(t) {
        return !(t.classinfor && t.classinfor.length > 0 && 0 == t.classinfor.filter(function(t) {
            return !0 === e.displayCabin[t.cgrd]
        }).length)
    })
      , n = i.length;
    if (0 == n && (i = t.policyinfo,
    n = i.length),
    n > 1) {
        var r = e.isIntl && 2 === e.priceType ? "price" : "tprice";
        i.sort(function(t, e) {
            return t[r] - e[r]
        })
    }
    var a = i[0];
    t.policy = a,
    e.isIntl ? (t.sprice = a.price,
    t.price = a.tprice,
    t.tax = a.tax) : (t.price = a.tprice,
    t.drate = Object(ct.getRateTxt)(a.drate))
}
function getLowPrice(t, e) {
    return t.sort(function(t, i) {
        return t[e] - i[e]
    })[0][e]
}
function time2str(t) {
    var e = Math.floor(t / 60)
      , i = Math.floor(t % 60);
    return i <= 0 ? e + "h" : e <= 0 ? i + "m" : e + "h" + i + "m"
}
function visited(t, e, i) {
    t = this.flyKey + t,
    i && (t = i);
    var n = this.getLocalData("saveKey") || {};
    return e && (n[t] = 1,
    this.setLocalData("saveKey", n)),
    1 === n[t]
}
function getLocalData(t) {
    return this.saveData[t]
} 
function setLocalData(t, e) {
    this.saveData[t] = e,
    this.saveData = this.saveData
}
function setSortInFlist(t) {
    if (this.result && this.result.length > 0) {
        var e = JSON.parse(JSON.stringify(this.result));
        e.sort(function(e, i) {
            return e[t] - i[t]
        }),
        e.forEach(function(e, i) {
            e[t + "_id"] = i + 1
        }),
        this.result.forEach(function(i, n) {
            var r = e.filter(function(t) {
                return t.id === i.id
            })[0];
            i[t + "_id"] = r && r[t + "_id"]
        })
    }
}