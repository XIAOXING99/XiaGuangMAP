const cityList = [
  ["beijing","北京","北京",39.90,116.41,67],["tianjin","天津","天津",39.13,117.20,55],["shijiazhuang","石家庄","河北",38.04,114.51,48],
  ["taiyuan","太原","山西",37.87,112.55,62],["hohhot","呼和浩特","内蒙古",40.84,111.75,46],["shenyang","沈阳","辽宁",41.80,123.43,72],
  ["changchun","长春","吉林",43.82,125.32,53],["harbin","哈尔滨","黑龙江",45.80,126.53,41],["shanghai","上海","上海",31.23,121.47,78],
  ["nanjing","南京","江苏",32.06,118.80,64],["hangzhou","杭州","浙江",30.27,120.16,88],["hefei","合肥","安徽",31.82,117.23,71],
  ["fuzhou","福州","福建",26.08,119.30,68],["nanchang","南昌","江西",28.68,115.86,57],["jinan","济南","山东",36.67,116.98,74],
  ["zhengzhou","郑州","河南",34.75,113.62,59],["wuhan","武汉","湖北",30.59,114.30,66],["changsha","长沙","湖南",28.23,112.94,61],
  ["guangzhou","广州","广东",23.13,113.26,76],["nanning","南宁","广西",22.82,108.32,51],["haikou","海口","海南",20.04,110.20,73],
  ["chongqing","重庆","重庆",29.56,106.55,69],["chengdu","成都","四川",30.57,104.07,81],["guiyang","贵阳","贵州",26.65,106.63,49],
  ["kunming","昆明","云南",25.04,102.71,44],["lhasa","拉萨","西藏",29.65,91.17,79],["xian","西安","陕西",34.34,108.94,70],
  ["lanzhou","兰州","甘肃",36.06,103.83,58],["xining","西宁","青海",36.62,101.78,63],["yinchuan","银川","宁夏",38.49,106.23,52],
  ["urumqi","乌鲁木齐","新疆",43.83,87.62,42],["hongkong","香港","香港",22.32,114.17,65],["macau","澳门","澳门",22.20,113.54,60],
  ["taipei","台北","台湾",25.03,121.57,75]
];

const cities = {};
cityList.forEach(function(item, index) {
  const sunriseSeed = clamp(item[5] + ((index % 5) - 2) * 6, 12, 94);
  const sunsetIntensitySeed = Math.round(clamp(item[5] + ((index % 4) - 1.5) * 7, 8, 96));
  const sunriseIntensitySeed = Math.round(clamp(sunriseSeed + ((index % 3) - 1) * 8, 8, 96));
  cities[item[0]] = {
    name: item[1],
    region: item[2] + " · " + item[1],
    lat: item[3],
    lon: item[4],
    score: item[5],
    sunsetScore: item[5],
    sunriseScore: sunriseSeed,
    sunsetIntensity: sunsetIntensitySeed,
    sunriseIntensity: sunriseIntensitySeed,
    seed: item[5],
    featured: index % 7 === 0 || item[5] >= 78,
    sunsetTrend: [Math.max(12,item[5]-28),Math.max(18,item[5]-17),Math.max(25,item[5]-8),item[5],Math.max(18,item[5]-15),Math.max(10,item[5]-29)],
    sunriseTrend: [Math.max(10,sunriseSeed-25),Math.max(16,sunriseSeed-14),Math.max(22,sunriseSeed-6),sunriseSeed,Math.max(17,sunriseSeed-13),Math.max(9,sunriseSeed-27)],
    sunsetIntensityTrend: [Math.max(8,sunsetIntensitySeed-24),Math.max(12,sunsetIntensitySeed-13),Math.max(18,sunsetIntensitySeed-5),sunsetIntensitySeed,Math.max(14,sunsetIntensitySeed-14),Math.max(7,sunsetIntensitySeed-28)],
    sunriseIntensityTrend: [Math.max(8,sunriseIntensitySeed-22),Math.max(12,sunriseIntensitySeed-12),Math.max(18,sunriseIntensitySeed-4),sunriseIntensitySeed,Math.max(14,sunriseIntensitySeed-12),Math.max(7,sunriseIntensitySeed-26)],
    dataSource: "本地示例",
    dataConfidence: "待联网校准"
  };
});

const fallbackTimes = {
  sunrise: ["04:30","05:00","05:30","06:00","06:30","07:00"],
  sunset: ["15:00","16:00","17:00","18:00","19:00","20:00"]
};
const citySceneLandmarks = {
  beijing:"北京 · 国贸CBD", tianjin:"天津 · 海河之眼", shijiazhuang:"石家庄 · 城市CBD", taiyuan:"太原 · 双塔寺",
  hohhot:"呼和浩特 · 内蒙古博物院", shenyang:"沈阳 · 电视塔CBD", changchun:"长春 · 城市CBD", harbin:"哈尔滨 · 圣索菲亚教堂",
  shanghai:"上海 · 陆家嘴", nanjing:"南京 · 玄武湖紫峰", hangzhou:"杭州 · 西湖雷峰塔", hefei:"合肥 · 天鹅湖CBD",
  fuzhou:"福州 · 闽江CBD", nanchang:"南昌 · 滕王阁红谷滩", jinan:"济南 · 大明湖", zhengzhou:"郑州 · 郑东新区",
  wuhan:"武汉 · 黄鹤楼长江", changsha:"长沙 · 湘江杜甫江阁", guangzhou:"广州 · 广州塔珠江新城", nanning:"南宁 · 会展中心CBD",
  haikou:"海口 · 世纪大桥", chongqing:"重庆 · 洪崖洞两江", chengdu:"成都 · 天府双塔", guiyang:"贵阳 · 甲秀楼",
  kunming:"昆明 · 滇池西山", lhasa:"拉萨 · 布达拉宫", xian:"西安 · 钟楼城墙", lanzhou:"兰州 · 黄河中山桥",
  xining:"西宁 · 山水CBD", yinchuan:"银川 · 鼓楼贺兰山", urumqi:"乌鲁木齐 · 天山CBD", hongkong:"香港 · 维多利亚港",
  macau:"澳门 · 葡京与澳门塔", taipei:"台北 · 台北101"
};
const cityScenes = {};
Object.keys(citySceneLandmarks).forEach(function(key) {
  const filename = key === "shanghai" ? "shanghai-lujiazui-sunset.jpg" : key + "-sunset.jpg";
  cityScenes[key] = {
    src: "assets/city-scenes/" + filename,
    title: citySceneLandmarks[key],
    type: "专属城市晚霞",
    alt: citySceneLandmarks[key] + "晚霞氛围图"
  };
});
const fallbackScene = {
  src: "assets/city-scenes/cbd-sunset-fallback.jpg",
  type: "CBD晚霞",
  alt: "现代城市CBD与江面晚霞氛围图"
};
const $ = function(id) { return document.getElementById(id); };
let cityKey = "guangzhou";
let glowMode = "sunset";
let timer = null;
let searchTimer = null;
let satelliteOn = false;
let worldMap = null;
let tileLayer = null;
let chinaTileLayer = null;
let markerLayer = null;
let heatLayer = null;
let chinaGlowLayer = null;
let cloudOverlay = null;
let currentLocationLayer = null;
let previousFocus = null;
const CACHE_VERSION = "v4";
const CACHE_TTL = 15 * 60 * 1000;
const EVENT_OFFSETS = [-90,-60,-30,0,30,60];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function burnInfo(value) {
  if (value >= 90) return { label: "特大烧", color: "#9f0036" };
  if (value >= 80) return { label: "大烧", color: "#c20b3c" };
  if (value >= 70) return { label: "中到大烧", color: "#e33449" };
  if (value >= 60) return { label: "中烧", color: "#ff624f" };
  if (value >= 50) return { label: "小到中烧", color: "#ff8668" };
  if (value >= 40) return { label: "小烧", color: "#ffa68e" };
  if (value >= 30) return { label: "微到小烧", color: "#ffc1ae" };
  if (value >= 20) return { label: "微烧", color: "#d9b7ac" };
  return { label: "不烧", color: "#6c7a8f" };
}

function activeScore(city) {
  return glowMode === "sunrise" ? city.sunriseScore : city.sunsetScore;
}

function activeIntensity(city) {
  return glowMode === "sunrise" ? city.sunriseIntensity : city.sunsetIntensity;
}

function activeTrend(city) {
  return glowMode === "sunrise" ? city.sunriseTrend : city.sunsetTrend;
}

function activeIntensityTrend(city) {
  return glowMode === "sunrise" ? city.sunriseIntensityTrend : city.sunsetIntensityTrend;
}

function weatherInfo(code) {
  code = Number(code);
  if (code === 0) return { label: "晴", icon: "☀" };
  if (code <= 2) return { label: "晴间多云", icon: "⛅" };
  if (code === 3) return { label: "阴", icon: "☁" };
  if (code === 45 || code === 48) return { label: "雾", icon: "≋" };
  if (code >= 51 && code <= 57) return { label: "毛毛雨", icon: "🌦" };
  if (code >= 61 && code <= 67) return { label: "雨", icon: "🌧" };
  if (code >= 71 && code <= 77) return { label: "雪", icon: "❄" };
  if (code >= 80 && code <= 82) return { label: "阵雨", icon: "🌦" };
  if (code >= 85 && code <= 86) return { label: "阵雪", icon: "🌨" };
  if (code >= 95) return { label: "雷雨", icon: "⛈" };
  return { label: "天气待更新", icon: "◌" };
}

function validNumber(value, fallback) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function glowMetrics(low, mid, high, visibility, precipitationProbability) {
  low = clamp(validNumber(low,50),0,100);
  mid = clamp(validNumber(mid,35),0,100);
  high = clamp(validNumber(high,35),0,100);
  const rain = clamp(validNumber(precipitationProbability,20),0,100);
  const visibilityScore = clamp(validNumber(visibility,12000) / 30000 * 100,0,100);
  const clearHorizon = 100 - low;
  const colorCloud = clamp(mid * .62 + high * .42,0,100);
  const cloudScarcityPenalty = Math.max(0,18 - colorCloud) * 1.15;
  const probability = Math.round(clamp(5 + clearHorizon * .25 + colorCloud * .42 + visibilityScore * .16 - rain * .30 - cloudScarcityPenalty,3,97));
  const intensity = Math.round(clamp(2 + colorCloud * .56 + clearHorizon * .24 + visibilityScore * .14 - rain * .24 - low * .16,0,100));
  return { probability: probability, intensity: intensity };
}

function hourlyMetricsAtIndex(data, index) {
  const hourly = data.hourly || {};
  return glowMetrics(
    hourly.cloud_cover_low && hourly.cloud_cover_low[index],
    hourly.cloud_cover_mid && hourly.cloud_cover_mid[index],
    hourly.cloud_cover_high && hourly.cloud_cover_high[index],
    hourly.visibility && hourly.visibility[index],
    hourly.precipitation_probability && hourly.precipitation_probability[index]
  );
}

function metricsAtTime(data, targetTime, fallbackProbability, fallbackIntensity) {
  const hourly = data.hourly || {};
  if (!targetTime || !Array.isArray(hourly.time) || !hourly.time.length) {
    return { probability:fallbackProbability, intensity:fallbackIntensity };
  }
  const target = new Date(targetTime).getTime();
  const times = hourly.time.map(function(value) { return new Date(value).getTime(); });
  let upper = times.findIndex(function(value) { return value >= target; });
  if (upper < 0) upper = times.length - 1;
  const lower = Math.max(0,upper - 1);
  if (lower === upper || times[upper] === times[lower]) return hourlyMetricsAtIndex(data,upper);
  const ratio = clamp((target - times[lower]) / (times[upper] - times[lower]),0,1);
  const before = hourlyMetricsAtIndex(data,lower);
  const after = hourlyMetricsAtIndex(data,upper);
  return {
    probability: Math.round(before.probability + (after.probability - before.probability) * ratio),
    intensity: Math.round(before.intensity + (after.intensity - before.intensity) * ratio)
  };
}

function eventTrend(data, eventTime, fallbackProbability, fallbackIntensity) {
  if (!eventTime) {
    return {
      probability:[fallbackProbability,fallbackProbability,fallbackProbability,fallbackProbability,fallbackProbability,fallbackProbability],
      intensity:[fallbackIntensity,fallbackIntensity,fallbackIntensity,fallbackIntensity,fallbackIntensity,fallbackIntensity]
    };
  }
  const eventMs = new Date(eventTime).getTime();
  const samples = EVENT_OFFSETS.map(function(offset) {
    return metricsAtTime(data,new Date(eventMs + offset * 60000),fallbackProbability,fallbackIntensity);
  });
  return {
    probability:samples.map(function(item) { return item.probability; }),
    intensity:samples.map(function(item) { return item.intensity; })
  };
}

function formatClock(value) {
  if (!value) return "待更新";
  const date = new Date(value);
  return String(date.getHours()).padStart(2,"0") + ":" + String(date.getMinutes()).padStart(2,"0");
}

function formatEventWindow(value) {
  if (!value) return "前后约20分钟";
  const date = new Date(value);
  const before = new Date(date.getTime() - 18 * 60000);
  const after = new Date(date.getTime() + 22 * 60000);
  return formatClock(before) + "–" + formatClock(after);
}

function formatUpdateTime(value) {
  if (!value) return "刚刚";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "刚刚";
  return String(date.getMonth()+1).padStart(2,"0") + "-" + String(date.getDate()).padStart(2,"0") + " " + formatClock(value);
}

function applyForecastData(city, data, scope) {
  scope = scope || "detail";
  if (scope === "summary" && city.forecastLoaded) return;
  const daily = data.daily || {};
  const current = data.current || {};
  const sunriseEvents = daily.sunrise || [];
  const sunsetEvents = daily.sunset || [];
  const sunriseDays = sunriseEvents.slice(0,scope === "detail" ? 3 : 1).map(function(event) {
    return metricsAtTime(data,event,city.sunriseScore,city.sunriseIntensity);
  });
  const sunsetDays = sunsetEvents.slice(0,scope === "detail" ? 3 : 1).map(function(event) {
    return metricsAtTime(data,event,city.sunsetScore,city.sunsetIntensity);
  });
  if (scope === "detail" || !city.daysSunrise) city.daysSunrise = sunriseDays;
  if (scope === "detail" || !city.daysSunset) city.daysSunset = sunsetDays;
  if (sunriseDays.length) {
    city.sunriseScore = sunriseDays[0].probability;
    city.sunriseIntensity = sunriseDays[0].intensity;
  }
  if (sunsetDays.length) {
    city.sunsetScore = sunsetDays[0].probability;
    city.sunsetIntensity = sunsetDays[0].intensity;
  }
  city.score = city.sunsetScore;
  city.sunriseEvent = sunriseEvents[0] || city.sunriseEvent;
  city.sunsetEvent = sunsetEvents[0] || city.sunsetEvent;
  city.sunriseTime = formatEventWindow(city.sunriseEvent);
  city.sunsetTime = formatEventWindow(city.sunsetEvent);
  const sunriseTrend = eventTrend(data,city.sunriseEvent,city.sunriseScore,city.sunriseIntensity);
  const sunsetTrend = eventTrend(data,city.sunsetEvent,city.sunsetScore,city.sunsetIntensity);
  city.sunriseTrend = sunriseTrend.probability;
  city.sunsetTrend = sunsetTrend.probability;
  city.sunriseIntensityTrend = sunriseTrend.intensity;
  city.sunsetIntensityTrend = sunsetTrend.intensity;
  city.weather = {
    temperature: current.temperature_2m,
    apparent: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    code: current.weather_code,
    min: daily.temperature_2m_min && daily.temperature_2m_min[0],
    max: daily.temperature_2m_max && daily.temperature_2m_max[0]
  };
  city.live = true;
  city.loading = false;
  city.dataSource = "Open-Meteo";
  city.dataUpdated = current.time || new Date().toISOString();
  city.dataConfidence = data.hourly && data.hourly.time && data.hourly.time.length ? "模型中等" : "模型较低";
  city.summaryLoaded = true;
  if (scope === "detail") city.forecastLoaded = true;
}

function geometryBounds(geometry) {
  let minLat = 90;
  let maxLat = -90;
  let minLon = 180;
  let maxLon = -180;
  function scan(value) {
    if (!Array.isArray(value)) return;
    if (typeof value[0] === "number" && typeof value[1] === "number") {
      minLon = Math.min(minLon, value[0]);
      maxLon = Math.max(maxLon, value[0]);
      minLat = Math.min(minLat, value[1]);
      maxLat = Math.max(maxLat, value[1]);
      return;
    }
    value.forEach(scan);
  }
  scan(geometry.coordinates);
  return L.latLngBounds([[minLat,minLon],[maxLat,maxLon]]);
}

function traceGeometry(context, geometry, map) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  polygons.forEach(function(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(coordinate, index) {
        const point = map.latLngToContainerPoint([coordinate[1], coordinate[0]]);
        if (index === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
      });
      context.closePath();
    });
  });
}

function pointInRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const crosses = ((yi > lat) !== (yj > lat)) && lon < (xj - xi) * (lat - yi) / ((yj - yi) || 1e-9) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function geometryContains(geometry, lat, lon) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.some(function(polygon) {
    if (!polygon.length || !pointInRing(lon,lat,polygon[0])) return false;
    return !polygon.slice(1).some(function(hole) { return pointInRing(lon,lat,hole); });
  });
}

function shortRegionName(name) {
  return String(name || "")
    .replace("内蒙古自治区","内蒙古")
    .replace("广西壮族自治区","广西")
    .replace("西藏自治区","西藏")
    .replace("宁夏回族自治区","宁夏")
    .replace("新疆维吾尔自治区","新疆")
    .replace("香港特别行政区","香港")
    .replace("澳门特别行政区","澳门")
    .replace(/[省市]$/g,"");
}

function glowPalette(score) {
  if (score >= 90) return ["rgba(132,0,42,.98)","rgba(210,0,62,.82)","rgba(255,91,73,0)"];
  if (score >= 80) return ["rgba(178,0,48,.96)","rgba(237,23,69,.76)","rgba(255,113,76,0)"];
  if (score >= 70) return ["rgba(218,25,56,.94)","rgba(255,62,73,.72)","rgba(255,132,85,0)"];
  if (score >= 60) return ["rgba(246,69,61,.90)","rgba(255,103,80,.66)","rgba(255,158,111,0)"];
  if (score >= 50) return ["rgba(255,101,76,.86)","rgba(255,140,105,.58)","rgba(255,186,145,0)"];
  if (score >= 40) return ["rgba(255,145,116,.80)","rgba(255,183,155,.48)","rgba(255,214,193,0)"];
  if (score >= 30) return ["rgba(255,183,156,.70)","rgba(255,211,192,.38)","rgba(255,232,218,0)"];
  if (score >= 20) return ["rgba(213,180,170,.54)","rgba(213,199,193,.26)","rgba(224,216,211,0)"];
  return ["rgba(88,116,148,.34)","rgba(75,100,132,.16)","rgba(64,86,118,0)"];
}

const ChinaGlowLayer = L.Layer.extend({
  initialize: function(geojson) {
    this._parts = (geojson.features || []).map(function(feature) {
      const properties = feature.properties || {};
      return {
        geometry: feature.geometry,
        bounds: geometryBounds(feature.geometry),
        name: shortRegionName(properties.name),
        center: properties.centroid || properties.center
      };
    });
  },
  onAdd: function(map) {
    this._map = map;
    this._canvas = L.DomUtil.create("canvas", "china-glow-layer leaflet-zoom-animated");
    this._canvas.setAttribute("aria-hidden", "true");
    map.getPanes().overlayPane.appendChild(this._canvas);
    map.on("moveend zoomend resize viewreset", this.redraw, this);
    this.redraw();
  },
  onRemove: function(map) {
    map.off("moveend zoomend resize viewreset", this.redraw, this);
    L.DomUtil.remove(this._canvas);
    map.getContainer().classList.remove("china-rendering");
  },
  isChinaView: function() {
    if (this._map.getZoom() < 3.5) return false;
    const visibleBounds = this._map.getBounds().pad(-.06);
    return this._parts.some(function(part) {
      return visibleBounds.intersects(part.bounds);
    });
  },
  redraw: function() {
    if (!this._map || !this._canvas) return;
    const map = this._map;
    const canvas = this._canvas;
    const active = this.isChinaView();
    map.getContainer().classList.toggle("china-rendering", active);
    if (!active) {
      const idleContext = canvas.getContext("2d");
      idleContext.clearRect(0,0,canvas.width,canvas.height);
      return;
    }

    const size = map.getSize();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const topLeft = map.containerPointToLayerPoint([0,0]);
    L.DomUtil.setPosition(canvas, topLeft);
    canvas.width = Math.round(size.x * ratio);
    canvas.height = Math.round(size.y * ratio);
    canvas.style.width = size.x + "px";
    canvas.style.height = size.y + "px";
    const context = canvas.getContext("2d");
    context.setTransform(ratio,0,0,ratio,0,0);
    context.clearRect(0,0,size.x,size.y);
    const visibleBounds = map.getBounds().pad(.18);
    const visibleParts = this._parts.filter(function(part) { return visibleBounds.intersects(part.bounds); });
    const zoom = map.getZoom();
    const timeIndex = Number($("timeRange").value);

    context.save();
    context.beginPath();
    visibleParts.forEach(function(part) { traceGeometry(context, part.geometry, map); });
    context.clip("evenodd");

    const centerAlpha = zoom < 6 ? .46 : (zoom < 9 ? .40 : .32);
    const edgeAlpha = zoom < 6 ? .55 : (zoom < 9 ? .48 : .38);
    const baseGradient = context.createRadialGradient(size.x*.57,size.y*.48,20,size.x*.57,size.y*.48,Math.max(size.x,size.y)*.72);
    baseGradient.addColorStop(0,"rgba(70,117,151," + centerAlpha + ")");
    baseGradient.addColorStop(1,"rgba(26,67,101," + edgeAlpha + ")");
    context.fillStyle = baseGradient;
    context.fillRect(0,0,size.x,size.y);

    context.globalCompositeOperation = "source-over";
    Object.values(cities).forEach(function(city) {
      if (city.custom || !visibleBounds.contains([city.lat,city.lon])) return;
      const probabilityTrend = activeTrend(city);
      const intensityTrend = activeIntensityTrend(city);
      const probability = probabilityTrend[timeIndex] == null ? activeScore(city) : probabilityTrend[timeIndex];
      const intensity = intensityTrend[timeIndex] == null ? activeIntensity(city) : intensityTrend[timeIndex];
      const point = map.latLngToContainerPoint([city.lat,city.lon]);
      const radius = clamp((34 + probability * .78) * Math.pow(1.28, map.getZoom() - 4), 30, 210);
      const colors = glowPalette(intensity);
      const glow = context.createRadialGradient(point.x,point.y,0,point.x,point.y,radius);
      glow.addColorStop(0,colors[0]);
      glow.addColorStop(.34,colors[1]);
      glow.addColorStop(1,colors[2]);
      context.fillStyle = glow;
      context.globalAlpha = clamp(probability / 72,.42,1);
      context.fillRect(point.x-radius,point.y-radius,radius*2,radius*2);
    });
    context.globalAlpha = 1;
    context.restore();

    context.save();
    context.beginPath();
    visibleParts.forEach(function(part) { traceGeometry(context, part.geometry, map); });
    context.strokeStyle = "rgba(204,229,249,.45)";
    context.lineWidth = map.getZoom() >= 7 ? 1.15 : .78;
    context.shadowColor = "rgba(62,169,255,.42)";
    context.shadowBlur = map.getZoom() >= 7 ? 2 : 4;
    context.stroke();
    context.restore();

    if (map.getZoom() >= 3.5 && map.getZoom() < 6.4) {
      context.save();
      context.font = "700 " + (map.getZoom() >= 5 ? 12 : 10) + "px 'Microsoft YaHei','PingFang SC',sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(225,239,252,.76)";
      context.shadowColor = "rgba(0,0,0,.92)";
      context.shadowBlur = 5;
      visibleParts.forEach(function(part) {
        if (!part.center || !part.name) return;
        const labelPoint = map.latLngToContainerPoint([part.center[1],part.center[0]]);
        if (labelPoint.x < -30 || labelPoint.x > size.x + 30 || labelPoint.y < -20 || labelPoint.y > size.y + 20) return;
        context.fillText(part.name,labelPoint.x,labelPoint.y);
      });
      context.restore();
    }
  }
});

function renderMarkers() {
  if (!worldMap || !markerLayer || !heatLayer) return;
  markerLayer.clearLayers();
  heatLayer.clearLayers();
  const zoom = worldMap.getZoom();
  const rankedKeys = Object.keys(cities).sort(function(a,b) {
    return validNumber(activeScore(cities[b]),0) - validNumber(activeScore(cities[a]),0);
  });
  const labelLimit = zoom < 4.5 ? 5 : (zoom < 5.5 ? 8 : (zoom < 6.5 ? 14 : Number.POSITIVE_INFINITY));
  const labelKeys = new Set(rankedKeys.slice(0,labelLimit));
  Object.entries(cities).forEach(function(entry) {
    const key = entry[0];
    const city = entry[1];
    const probability = validNumber(activeScore(city),0);
    const intensity = validNumber(activeIntensity(city),0);
    const burn = burnInfo(intensity);
    const labelVisible = key === cityKey || labelKeys.has(key) || (zoom >= 5.5 && city.featured);
    const markerClass = "map-city-marker" + (key === cityKey ? " active" : "") + (labelVisible ? " label-visible" : "");
    const probabilityLabel = city.loading || activeScore(city) == null ? "计算中" : probability + "%";
    const markerHtml = "<span class=\"" + markerClass + "\" style=\"--dot:" + burn.color + ";--dot-size:" + (city.loading ? 8 : 7 + probability / 18) + "px\"><i class=\"map-city-dot\"></i><b class=\"map-city-label\">" + city.name + " " + probabilityLabel + "</b></span>";
    L.circleMarker([city.lat, city.lon], {
      radius: city.loading ? 10 : 12 + probability / 8,
      stroke: false,
      fillColor: burn.color,
      fillOpacity: city.loading ? .12 : clamp(probability / 260, .12, .38),
      interactive: false
    }).addTo(heatLayer);
    L.marker([city.lat, city.lon], {
      icon: L.divIcon({ className: "map-city-icon", html: markerHtml, iconSize: [1,1], iconAnchor: [0,0] }),
      title: city.name + " " + (glowMode === "sunrise" ? "朝霞" : "晚霞") + "概率 " + probabilityLabel + " · " + burn.label,
      keyboard: true,
      riseOnHover: true
    }).on("click", function() { selectCity(key, true); }).addTo(markerLayer);
  });
}

function initializeWorldMap() {
  if (!window.L) {
    $("mapStatus").textContent = "地图组件加载失败";
    return;
  }
  worldMap = L.map("worldMap", {
    zoomControl: false,
    minZoom: 1,
    maxZoom: 18,
    zoomSnap: .5,
    zoomDelta: .5,
    worldCopyJump: false,
    maxBounds: [[-85,-180],[85,180]],
    maxBoundsViscosity: .8
  }).setView([35.8,104.2], 4);
  worldMap.attributionControl.setPrefix(false);
  tileLayer = L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    minZoom: 1,
    maxZoom: 18,
    maxNativeZoom: 19,
    noWrap: true,
    keepBuffer: 4,
    updateWhenIdle: false,
    attribution: "Tiles &copy; <a href=\"https://www.esri.com/\" target=\"_blank\" rel=\"noopener\">Esri</a>, HERE, Garmin, OpenStreetMap contributors"
  });
  chinaTileLayer = L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    minZoom: 1,
    maxZoom: 18,
    maxNativeZoom: 16,
    noWrap: true,
    keepBuffer: 4,
    updateWhenIdle: false,
    className: "china-flat-tiles",
    attribution: "Flat base &copy; <a href=\"https://www.esri.com/\" target=\"_blank\" rel=\"noopener\">Esri</a>"
  });
  let initialTilesReady = false;
  let loadedTileCount = 0;
  function revealInitialTiles() {
    if (initialTilesReady) return;
    initialTilesReady = true;
    worldMap.getContainer().classList.add("tiles-ready");
    $("mapStatus").classList.add("hidden");
  }
  function bindTileState(layer) {
    layer.on("loading", function() {
      if (!initialTilesReady) {
        $("mapStatus").textContent = "正在加载地图";
        $("mapStatus").classList.remove("hidden");
      }
    });
    layer.on("tileload", function() {
      loadedTileCount += 1;
      if (loadedTileCount >= 8) revealInitialTiles();
    });
    layer.on("load", revealInitialTiles);
    layer.on("tileerror", function() {
      if (!initialTilesReady) $("mapStatus").textContent = "部分底图正在重试…";
    });
  }
  bindTileState(tileLayer);
  bindTileState(chinaTileLayer);
  chinaTileLayer.addTo(worldMap);
  setTimeout(revealInitialTiles, 2800);
  if (window.XIAGUANG_CHINA_GEOJSON) {
    chinaGlowLayer = new ChinaGlowLayer(window.XIAGUANG_CHINA_GEOJSON).addTo(worldMap);
  }
  heatLayer = L.layerGroup().addTo(worldMap);
  markerLayer = L.layerGroup().addTo(worldMap);
  cloudOverlay = L.imageOverlay("assets/satellite-cloud-overlay.png", [[17,73],[54,135]], {
    opacity: .42,
    interactive: false,
    className: "cloud-map-overlay"
  });
  worldMap.on("zoomend", renderMarkers);
  function syncBaseLayer() {
    if (!chinaGlowLayer) return;
    const useChineseChinaView = chinaGlowLayer.isChinaView();
    const target = useChineseChinaView ? chinaTileLayer : tileLayer;
    const previous = useChineseChinaView ? tileLayer : chinaTileLayer;
    if (worldMap.hasLayer(previous)) worldMap.removeLayer(previous);
    if (!worldMap.hasLayer(target)) target.addTo(worldMap);
    target.bringToBack();
  }
  worldMap.on("moveend zoomend", syncBaseLayer);
  syncBaseLayer();
}

function renderThreeDay(city) {
  const sunriseValues = city.daysSunrise || [];
  const sunsetValues = city.daysSunset || [];
  const labels = ["今天","明天","后天"];
  function valueAt(values, index, probability, intensity) {
    const value = values[index];
    if (value && typeof value === "object") return value;
    if (Number.isFinite(Number(value))) return { probability:Number(value), intensity:Number(intensity) };
    if (index === 0 && Number.isFinite(Number(probability))) return { probability:Number(probability), intensity:Number(intensity) };
    return null;
  }
  $("threeDayGrid").innerHTML = labels.map(function(label, index) {
    const sunrise = valueAt(sunriseValues,index,city.sunriseScore,city.sunriseIntensity);
    const sunset = valueAt(sunsetValues,index,city.sunsetScore,city.sunsetIntensity);
    const sunriseBurn = burnInfo(sunrise ? sunrise.intensity : 0);
    const sunsetBurn = burnInfo(sunset ? sunset.intensity : 0);
    return "<div class=\"day-card\"><small>" + label + "</small>" +
      "<div class=\"day-glow-row\"><span>朝霞概率</span><strong style=\"color:" + sunriseBurn.color + "\">" + (sunrise ? sunrise.probability + "%" : "--") + "</strong><em>" + (sunrise ? "强度 " + sunrise.intensity + " · " + sunriseBurn.label : "等待城市详细预报") + "</em></div>" +
      "<div class=\"day-glow-row\"><span>晚霞概率</span><strong style=\"color:" + sunsetBurn.color + "\">" + (sunset ? sunset.probability + "%" : "--") + "</strong><em>" + (sunset ? "强度 " + sunset.intensity + " · " + sunsetBurn.label : "等待城市详细预报") + "</em></div></div>";
  }).join("");
}

function eventTimes(city) {
  const event = glowMode === "sunrise" ? city.sunriseEvent : city.sunsetEvent;
  if (!event) return fallbackTimes[glowMode];
  const date = new Date(event);
  return EVENT_OFFSETS.map(function(offset) {
    const value = new Date(date.getTime() + offset * 60000);
    return String(value.getHours()).padStart(2,"0") + ":" + String(value.getMinutes()).padStart(2,"0");
  });
}

function updateTimeline() {
  const city = cities[cityKey];
  const index = Number($("timeRange").value);
  const probabilityTrend = activeTrend(city) || [];
  const intensityTrend = activeIntensityTrend(city) || [];
  const probability = probabilityTrend[index] == null ? activeScore(city) : probabilityTrend[index];
  const intensity = intensityTrend[index] == null ? activeIntensity(city) : intensityTrend[index];
  const burn = burnInfo(validNumber(intensity,0));
  const times = eventTimes(city);
  $("trendLabel").textContent = "今日" + (glowMode === "sunrise" ? "朝霞" : "晚霞") + "趋势";
  $("timeValue").textContent = times[index] + " · " + (probability == null ? "计算中" : "概率 " + probability + "% · " + burn.label);
  $("timeLabels").innerHTML = times.map(function(time) { return "<span>" + time + "</span>"; }).join("");
  $("legendMode").textContent = glowMode === "sunrise" ? "朝霞" : "晚霞";
  if (chinaGlowLayer) chinaGlowLayer.redraw();
}

function showCityScene(key, city) {
  const scene = cityScenes[key] || fallbackScene;
  const image = $("citySceneImage");
  $("citySceneTitle").textContent = scene.title || city.name + " · 城市CBD";
  $("citySceneType").textContent = scene.type;
  image.alt = scene.alt;
  if (image.getAttribute("src") !== scene.src) {
    image.classList.add("loading");
    image.onload = function() { image.classList.remove("loading"); };
    image.src = scene.src;
  } else {
    image.classList.remove("loading");
  }
}

function observationKey(key) {
  return "xiaguang:observation:v1:" + key;
}

function renderObservation(city) {
  let record = null;
  try { record = JSON.parse(localStorage.getItem(observationKey(cityKey)) || "null"); } catch (error) { record = null; }
  if (!record) {
    $("observationState").textContent = "尚未记录当前城市实况";
    return;
  }
  const label = record.value === "seen" ? "已见霞光" : "暂未出现";
  $("observationState").textContent = formatUpdateTime(record.time) + " · " + label + "（仅保存在本机）";
}

function saveObservation(value) {
  const record = { value:value, time:new Date().toISOString() };
  try { localStorage.setItem(observationKey(cityKey),JSON.stringify(record)); } catch (error) {}
  renderObservation(cities[cityKey]);
  showToast(value === "seen" ? "已记录：现场看到霞光" : "已记录：现场暂未出现");
}

function renderCityDetail(city) {
  const sunriseBurn = burnInfo(validNumber(city.sunriseIntensity,0));
  const sunsetBurn = burnInfo(validNumber(city.sunsetIntensity,0));
  const weather = city.weather || {};
  const weatherState = weatherInfo(weather.code);
  const temperature = Number.isFinite(Number(weather.temperature)) ? Math.round(Number(weather.temperature)) + "°" : "--°";
  const apparent = Number.isFinite(Number(weather.apparent)) ? Math.round(Number(weather.apparent)) + "°" : "--°";
  const tempRange = Number.isFinite(Number(weather.min)) && Number.isFinite(Number(weather.max)) ? Math.round(Number(weather.min)) + "° / " + Math.round(Number(weather.max)) + "°" : "--° / --°";
  const humidity = Number.isFinite(Number(weather.humidity)) ? Math.round(Number(weather.humidity)) + "%" : "--";
  const wind = Number.isFinite(Number(weather.wind)) ? Math.round(Number(weather.wind)) + " km/h" : "--";
  $("detailSheet").classList.toggle("loading-weather",Boolean(city.loading && !city.weather));
  $("detailSheet").classList.toggle("loading-glow",Boolean(city.loading && city.sunriseScore == null && city.sunsetScore == null));

  $("detailTitle").textContent = city.name + "天气与霞光";
  $("weatherIcon").textContent = weatherState.icon;
  $("weatherCondition").textContent = weatherState.label;
  $("weatherTemp").textContent = temperature;
  $("weatherMeta").textContent = "体感 " + apparent + " · 今日 " + tempRange;
  $("weatherHumidity").textContent = humidity;
  $("weatherWind").textContent = wind;
  $("sunriseScore").textContent = city.sunriseScore == null ? "--%" : city.sunriseScore + "%";
  $("sunriseLevel").textContent = city.sunriseIntensity == null ? "待计算" : sunriseBurn.label;
  $("sunriseLevel").style.color = sunriseBurn.color;
  $("sunriseLevel").style.borderColor = sunriseBurn.color + "66";
  $("sunriseTime").textContent = city.sunriseTime || "日出前后约20分钟";
  $("sunriseIntensity").textContent = city.sunriseIntensity == null ? "--" : city.sunriseIntensity;
  $("sunriseIntensityBar").style.width = validNumber(city.sunriseIntensity,0) + "%";
  $("sunsetScore").textContent = city.sunsetScore == null ? "--%" : city.sunsetScore + "%";
  $("sunsetLevel").textContent = city.sunsetIntensity == null ? "待计算" : sunsetBurn.label;
  $("sunsetLevel").style.color = sunsetBurn.color;
  $("sunsetLevel").style.borderColor = sunsetBurn.color + "66";
  $("sunsetTime").textContent = city.sunsetTime || "日落前后约20分钟";
  $("sunsetIntensity").textContent = city.sunsetIntensity == null ? "--" : city.sunsetIntensity;
  $("sunsetIntensityBar").style.width = validNumber(city.sunsetIntensity,0) + "%";
  $("dataState").textContent = city.loading ? "正在计算" : (city.live ? (city.fromCache ? "缓存可用" : "模型已更新") : "本地示例");
  $("dataUpdated").textContent = city.dataUpdated ? formatUpdateTime(city.dataUpdated) : "尚未联网";
  $("dataSource").textContent = city.dataSource || "本地示例";
  $("dataConfidence").textContent = city.dataConfidence || "待校准";
  $("trendState").textContent = city.forecastLoaded ? "概率 / 强度独立计算" : (city.loading ? "正在读取逐时云层" : "点开后加载三日数据");
  renderThreeDay(city);
  renderObservation(city);
}

function selectCity(key, open) {
  cityKey = key;
  const city = cities[key];
  renderMarkers();
  if (worldMap && open !== false) {
    const targetZoom = city.custom ? Math.max(worldMap.getZoom(), 12) : Math.max(worldMap.getZoom(), 7);
    worldMap.flyTo([city.lat,city.lon], targetZoom, { duration: .65 });
  }
  $("detailRegion").textContent = city.region;
  renderCityDetail(city);
  updateTimeline();
  if (open !== false) {
    showCityScene(key, city);
    previousFocus = document.activeElement;
    $("detailSheet").classList.remove("expanded");
    $("sheetToggle").setAttribute("aria-expanded","false");
    $("detailSheet").scrollTop = 0;
    $("detailShade").classList.add("open");
    setTimeout(function() { $("closeDetail").focus(); },30);
  }
  if (!city.forecastLoaded) loadForecast(key);
}

function showToast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(function() { $("toast").classList.remove("show"); }, 2300);
}

function forecastUrl(latitude, longitude, days) {
  return "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,precipitation" +
    "&hourly=cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,precipitation_probability" +
    "&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&forecast_days=" + (days || 3) + "&timezone=auto";
}

const snapshotFields = [
  "score","sunriseScore","sunsetScore","sunriseIntensity","sunsetIntensity","sunriseTrend","sunsetTrend",
  "sunriseIntensityTrend","sunsetIntensityTrend","daysSunrise","daysSunset","sunriseEvent","sunsetEvent",
  "sunriseTime","sunsetTime","weather","live","dataSource","dataUpdated","dataConfidence","summaryLoaded","forecastLoaded"
];

function citySnapshot(city) {
  const result = {};
  snapshotFields.forEach(function(field) { if (city[field] !== undefined) result[field] = city[field]; });
  return result;
}

function restoreCity(city, snapshot, fromCache) {
  if (!snapshot) return;
  snapshotFields.forEach(function(field) { if (snapshot[field] !== undefined) city[field] = snapshot[field]; });
  city.loading = false;
  city.fromCache = Boolean(fromCache);
}

function readCache(key) {
  try {
    const value = JSON.parse(localStorage.getItem("xiaguang:" + CACHE_VERSION + ":" + key) || "null");
    if (!value || !value.savedAt || Date.now() - value.savedAt > CACHE_TTL) return null;
    return value;
  } catch (error) {
    return null;
  }
}

function writeCache(key, payload) {
  try { localStorage.setItem("xiaguang:" + CACHE_VERSION + ":" + key,JSON.stringify({ savedAt:Date.now(), payload:payload })); } catch (error) {}
}

function refreshVisibleData() {
  renderMarkers();
  updateTimeline();
  renderCityDetail(cities[cityKey]);
}

async function refreshAllScores(force) {
  if (!force) {
    const cached = readCache("summary");
    if (cached && cached.payload) {
      Object.keys(cached.payload).forEach(function(key) {
        if (cities[key]) restoreCity(cities[key],cached.payload[key],true);
      });
      refreshVisibleData();
      showToast("已读取15分钟内的全国预测缓存");
      return;
    }
  }
  const all = Object.values(cities).filter(function(city) { return !city.custom; });
  const url = forecastUrl(
    all.map(function(city) { return city.lat; }).join(","),
    all.map(function(city) { return city.lon; }).join(","),
    1
  );
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("weather");
    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : [payload];
    rows.forEach(function(row, index) {
      const city = all[index];
      if (city && row) {
        city.fromCache = false;
        applyForecastData(city,row,"summary");
      }
    });
    const summary = {};
    Object.keys(cities).forEach(function(key) { if (!cities[key].custom) summary[key] = citySnapshot(cities[key]); });
    writeCache("summary",summary);
    refreshVisibleData();
    showToast("34个地区天气、朝霞与晚霞已更新");
  } catch (error) {
    showToast("当前使用本地示例天气与霞光概率");
  }
}

async function loadForecast(key, force) {
  const city = cities[key];
  if (!city || city.forecastPromise) return city && city.forecastPromise;
  if (!force) {
    const cached = readCache("detail:" + key);
    if (cached && cached.payload) {
      restoreCity(city,cached.payload,true);
      if (key === cityKey) refreshVisibleData();
      return;
    }
  }
  city.loading = true;
  if (key === cityKey) renderCityDetail(city);
  const url = forecastUrl(city.lat,city.lon,3);
  city.forecastPromise = (async function() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("forecast");
    const data = await response.json();
    city.fromCache = false;
    applyForecastData(city,data,"detail");
    writeCache("detail:" + key,citySnapshot(city));
    if (key === cityKey) {
      refreshVisibleData();
    }
  } catch (error) {
    city.loading = false;
    if (key === cityKey) {
      renderCityDetail(city);
      $("trendState").textContent = city.live ? "网络失败，保留最近数据" : "网络失败，显示本地示例";
    }
  } finally {
    city.forecastPromise = null;
  }
  })();
  return city.forecastPromise;
}

function bindSearchResults() {
  document.querySelectorAll("[data-result]").forEach(function(button) {
    button.onclick = function() {
      $("searchShade").classList.remove("open");
      selectCity(button.dataset.result, true);
    };
  });
}

function renderLocalSearch(query) {
  const local = Object.entries(cities).filter(function(entry) {
    return entry[1].name.includes(query) || entry[1].region.includes(query);
  }).slice(0,8);
  $("searchResults").innerHTML = local.map(function(entry) {
    const value = activeScore(entry[1]);
    return "<button class=\"result\" data-result=\"" + entry[0] + "\"><strong>" + entry[1].region + "</strong><span>" + (value == null ? "待计算" : value + "%") + "</span></button>";
  }).join("") + (query.length >= 2 ? "<p class=\"data-state\" style=\"padding:10px 13px\">正在搜索全球城市与乡镇…</p>" : "");
  bindSearchResults();
}

async function searchDistricts(query) {
  try {
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(query) + "&count=10&language=zh&format=json");
    const data = await response.json();
    if ($("searchInput").value.trim() !== query) return;
    const allowed = (data.results || []).slice(0,8);
    if (!allowed.length) return;
    $("searchResults").innerHTML = allowed.map(function(item, index) {
      const label = [item.country,item.admin1,item.admin2,item.admin3,item.name].filter(Boolean).filter(function(value,i,array) { return array.indexOf(value) === i; }).join(" · ");
      const resultType = item.feature_code && item.feature_code.indexOf("PPL") === 0 ? "城镇" : "地区";
      return "<button class=\"result\" data-remote=\"" + index + "\"><strong>" + label + "</strong><span>" + resultType + "</span></button>";
    }).join("");
    document.querySelectorAll("[data-remote]").forEach(function(button) {
      button.onclick = function() {
        const item = allowed[Number(button.dataset.remote)];
        const key = "place_" + item.id;
        cities[key] = {
          name:item.name,
          region:[item.country,item.admin1,item.admin2,item.admin3,item.name].filter(Boolean).filter(function(value,i,array) { return array.indexOf(value) === i; }).join(" · "),
          lat:item.latitude,
          lon:item.longitude,
          score:null,
          sunriseScore:null,
          sunsetScore:null,
          sunriseIntensity:null,
          sunsetIntensity:null,
          seed:null,
          custom:true,
          loading:true,
          sunriseTrend:[],
          sunsetTrend:[],
          sunriseIntensityTrend:[],
          sunsetIntensityTrend:[],
          dataSource:"Open-Meteo",
          dataConfidence:"正在计算"
        };
        $("searchShade").classList.remove("open");
        renderMarkers();
        selectCity(key, true);
      };
    });
  } catch (error) {
    $("searchResults").insertAdjacentHTML("beforeend","<p class=\"data-state\" style=\"padding:10px 13px\">全球地点搜索暂时无法联网</p>");
  }
}

function renderSearch(query) {
  query = query.trim();
  renderLocalSearch(query);
  clearTimeout(searchTimer);
  if (query.length >= 2) searchTimer = setTimeout(function() { searchDistricts(query); }, 280);
}

$("timeRange").addEventListener("input", updateTimeline);
$("zoomIn").onclick = function() { if (worldMap) worldMap.zoomIn(); };
$("zoomOut").onclick = function() { if (worldMap) worldMap.zoomOut(); };
function locate() {
  if (!worldMap) return;
  if (!navigator.geolocation) {
    worldMap.setView([35.8,104.2],4);
    showToast("浏览器不支持定位，已返回中国大陆");
    return;
  }
  showToast("正在获取当前位置…");
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    worldMap.flyTo([lat,lon],12,{duration:.8});
    if (currentLocationLayer) worldMap.removeLayer(currentLocationLayer);
    currentLocationLayer = L.circleMarker([lat,lon],{
      radius:7,color:"#fff",weight:3,fillColor:"#4aa8ff",fillOpacity:1
    }).addTo(worldMap).bindTooltip("当前位置",{permanent:false});
    showToast("已定位到当前位置");
  },function() {
    worldMap.flyTo([35.8,104.2],4,{duration:.7});
    showToast("无法获取定位，已返回中国大陆");
  },{enableHighAccuracy:true,timeout:7000,maximumAge:300000});
}
$("locateTop").onclick = locate;
$("locateMap").onclick = locate;
$("openSearch").onclick = function() {
  $("searchShade").classList.add("open");
  renderSearch("");
  setTimeout(function() { $("searchInput").focus(); }, 40);
};
$("searchInput").oninput = function(event) { renderSearch(event.target.value); };
$("closeSearch").onclick = function() { $("searchShade").classList.remove("open"); };
function closeDetail() {
  $("detailShade").classList.remove("open");
  if (previousFocus && previousFocus.focus) previousFocus.focus();
}
$("closeDetail").onclick = closeDetail;
$("detailShade").onclick = function(event) { if (event.target === $("detailShade")) closeDetail(); };
$("searchShade").onclick = function(event) { if (event.target === $("searchShade")) $("searchShade").classList.remove("open"); };
$("sheetToggle").onclick = function() {
  const expanded = $("detailSheet").classList.toggle("expanded");
  $("sheetToggle").setAttribute("aria-expanded",String(expanded));
};
$("trendTab").onclick = function() {
  selectCity(cityKey,true);
  $("detailSheet").classList.add("expanded");
  $("sheetToggle").setAttribute("aria-expanded","true");
  setTimeout(function() { $("futureSection").scrollIntoView({behavior:"smooth",block:"start"}); },160);
};
function setGlowMode(next) {
  glowMode = next;
  $("sunriseTab").classList.toggle("active", next === "sunrise");
  $("sunsetTab").classList.toggle("active", next === "sunset");
  $("sunriseTab").setAttribute("aria-pressed", next === "sunrise");
  $("sunsetTab").setAttribute("aria-pressed", next === "sunset");
  renderMarkers();
  updateTimeline();
  showToast(next === "sunrise" ? "地图已切换为朝霞概率" : "地图已切换为晚霞概率");
}
$("sunriseTab").onclick = function() { setGlowMode("sunrise"); };
$("sunsetTab").onclick = function() { setGlowMode("sunset"); };
$("satelliteToggle").onclick = function() {
  satelliteOn = !satelliteOn;
  if (worldMap && cloudOverlay) {
    if (satelliteOn) cloudOverlay.addTo(worldMap); else worldMap.removeLayer(cloudOverlay);
  }
  $("satelliteToggle").classList.toggle("active",satelliteOn);
  $("satelliteToggle").setAttribute("aria-pressed",String(satelliteOn));
  showToast(satelliteOn ? "已开启云图示意层，不代表实时卫星观测" : "已关闭云图示意层");
};
$("refreshData").onclick = function() {
  const city = cities[cityKey];
  city.forecastLoaded = false;
  loadForecast(cityKey,true);
  showToast("正在刷新当前城市逐时数据");
};
$("observedGlow").onclick = function() { saveObservation("seen"); };
$("observedNone").onclick = function() { saveObservation("none"); };
$("playButton").onclick = function() {
  if (timer) { clearInterval(timer); timer=null; $("playButton").textContent="▶"; return; }
  $("playButton").textContent="Ⅱ";
  timer = setInterval(function() {
    const range = $("timeRange");
    range.value = (Number(range.value)+1)%6;
    updateTimeline();
    if (Number(range.value) === 5) { clearInterval(timer); timer=null; $("playButton").textContent="▶"; }
  },700);
};
document.addEventListener("keydown",function(event) {
  if (event.key === "Escape") {
    if ($("detailShade").classList.contains("open")) closeDetail();
    $("searchShade").classList.remove("open");
  }
  if (event.key === "Tab" && $("detailShade").classList.contains("open")) {
    const controls = Array.from($("detailShade").querySelectorAll("button,[href],input,[tabindex]:not([tabindex='-1'])"));
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

initializeWorldMap();
renderMarkers();
selectCity(cityKey,false);
refreshAllScores();
const qaCity = new URLSearchParams(window.location.search).get("qa");
if (qaCity && cities[qaCity]) setTimeout(function() { selectCity(qaCity,true); },80);
const mapQaCity = new URLSearchParams(window.location.search).get("mapqa");
if (mapQaCity && cities[mapQaCity]) {
  setTimeout(function() {
    worldMap.setView([cities[mapQaCity].lat, cities[mapQaCity].lon], 7);
  },80);
}
