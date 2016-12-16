
var shopinfo = require("../json/xinxi");
var showshopinfo = require("./insertshopinfo_crud");
var shopinfodata = shopinfo.shop_data;
for(i in shopinfodata){
	var shopId = shopinfodata[i].shop_id;
	var shopName = shopinfodata[i].shop_name;
	var shopIco = shopinfodata[i].shop_ico;
	var addr = shopinfodata[i].addr;
	var main = shopinfodata[i].main;
	var visit = shopinfodata[i].shop_visit;
	showshopinfo.insertjson(shopId,shopName,shopIco,addr,main,visit);
}

