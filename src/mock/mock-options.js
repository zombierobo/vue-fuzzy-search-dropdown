const mockOptions = [
  {
      "displayText": "Sprite-Pet-888ml",
      "id": "2808",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/522.png?20190419114647"
  },
  {
      "displayText": "SMART_apple_(low_sugar)-Pet-500ml",
      "id": "1016",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/464.png?20190419114513"
  },
  {
      "displayText": "Fanta_Apple-Pet-600ml",
      "id": "1032",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/465.png?20190419114513"
  },
  {
      "displayText": "Minute_Maid_Orange-Pet-450ml",
      "id": "1047",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/466.png?20190419114517"
  },
  {
      "displayText": "Coca_Cola_Vanila_Flavor-Pet-500ml",
      "id": "1060",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/467.png?20190419114516"
  },
  {
      "displayText": "Qoo_Grape-Pet-450ml",
      "id": "1089",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/468.png?20190419114519"
  },
  {
      "displayText": "Fanta_Orange_Juice-Pet-1.25L",
      "id": "1133",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/469.png?20190419114519"
  },
  {
      "displayText": "Coca_Cola_Curve-Pet-500ml",
      "id": "1140",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/470.png?20190419114522"
  },
  {
      "displayText": "Fanta_Orange_Juice_Curve-Pet-500ml",
      "id": "1143",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/471.png?20190419114523"
  },
  {
      "displayText": "Fanta_Apple-Pet-500ml",
      "id": "1154",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/472.png?20190419114528"
  },
  {
      "displayText": "Coca_Cola-Pet-1250ml",
      "id": "1180",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/473.png?20190419114525"
  },
  {
      "displayText": "Coca_Cola-Pet-2L",
      "id": "1190",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/474.png?20190419114529"
  },
  {
      "displayText": "Sprite-Pet-2L",
      "id": "1191",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/475.png?20190419114531"
  },
  {
      "displayText": "Fanta_Orange_Juice-Pet-2L",
      "id": "1193",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/476.png?20190419114532"
  },
  {
      "displayText": "Sprite-Pet-1250ml",
      "id": "1345",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/477.png?20190419114535"
  },
  {
      "displayText": "Sprite_Lemon_Curve-Pet-500ml",
      "id": "1347",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/478.png?20190419114535"
  },
  {
      "displayText": "Fanta_Apple-Pet-2L",
      "id": "1713",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/479.png?20190419114537"
  },
  {
      "displayText": "Qoo_Orange_Juice-Pet-1500ml",
      "id": "1743",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/480.png?20190419114540"
  },
  {
      "displayText": "Coca_Cola-Pet-2300ml",
      "id": "1747",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/481.png?20190419114542"
  },
  {
      "displayText": "Sprite-Pet-2300ml",
      "id": "1748",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/482.png?20190419114543"
  },
  {
      "displayText": "Fanta_Orange_Juice-Pet-2300ml",
      "id": "1749",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/483.png?20190419114545"
  },
  {
      "displayText": "Coca_Cola-Pet-1L",
      "id": "1791",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/484.png?20190419114547"
  },
  {
      "displayText": "Sprite-Pet-1L(1Lnewhit)",
      "id": "1792",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/485.png?20190419114550"
  },
  {
      "displayText": "Coca_Cola-Pet-600ml",
      "id": "1794",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/486.png?20190419114558"
  },
  {
      "displayText": "Sprite-Pet-600ml",
      "id": "1795",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/487.png?20190419114552"
  },
  {
      "displayText": "Fanta_Orange_Juice-Pet-600ml",
      "id": "1796",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/488.png?20190419114556"
  },
  {
      "displayText": "Minute_Maid_Orange-Pet-1250ml",
      "id": "1944",
      "previewUrl": "https://portal.visioniot.cn/Products/imageNotFound.png?16010101000000"
  },
  {
      "displayText": "Coca_Cola_Light-Rgb-200ml",
      "id": "1984",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/490.png?20190419114558"
  },
  {
      "displayText": "Sprite_Light-Rgb-200ml",
      "id": "1993",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/491.png?20190419114601"
  },
  {
      "displayText": "Fanta_orange_light-Rgb-200ml",
      "id": "1995",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/492.png?20190419114601"
  },
  {
      "displayText": "Sprite-Pet-2.5L",
      "id": "2251",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/494.png?20190419114604"
  },
  {
      "displayText": "Coca_Cola-Pet-2.5l",
      "id": "2252",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/495.png?20190419114606"
  },
  {
      "displayText": "Fanta_Grape-Pet-500ml",
      "id": "2276",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/496.png?20190419114606"
  },
  {
      "displayText": "Minute_Maid_Orange-Pet-1800ml",
      "id": "2350",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/497.png?20190419114610"
  },
  {
      "displayText": "Coca_Cola-can-330ml",
      "id": "2351",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/498.png?20190419114610"
  },
  {
      "displayText": "Coca_Cola_Vanila_Flavor-Can-330ml",
      "id": "2353",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/499.png?20190419114614"
  },
  {
      "displayText": "Diet_Coca_Cola-Can-330ml",
      "id": "2354",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/500.png?20190419114612"
  },
  {
      "displayText": "Sprite-Can-330ml",
      "id": "2356",
      "previewUrl": "https://portal.visioniot.cn/Products/imageNotFound.png?16010101000000"
  },
  {
      "displayText": "Fanta_Apple_Modern-Can-330ml",
      "id": "2359",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/502.png?20190419114615"
  },
  {
      "displayText": "Fanta_Orange_Juice-Can-330ml",
      "id": "2360",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/503.png?20190419114615"
  },
  {
      "displayText": "Fanta_Water_Peach-Pet-500ml",
      "id": "2378",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/504.png?20190419114618"
  },
  {
      "displayText": "Fanta_Water_Peach-Pet-600ml",
      "id": "2379",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/505.png?20190419114619"
  },
  {
      "displayText": "Foreign",
      "id": "000000",
      "previewUrl": "https://portal.visioniot.cn/Products/imageNotFound.png?16010101000000"
  },
  {
      "displayText": "Qoo_Orange_Juice-Can-310ml",
      "id": "2400",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/506.png?20190419114620"
  },
  {
      "displayText": "CHIVALRY_Salty_Sodawater_Lemon_Taste-Pet-600ml",
      "id": "2402",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/507.png?20190419114622"
  },
  {
      "displayText": "Minute_Maid_Tropical_Fruit-Pet-1250ml",
      "id": "2431",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/508.png?20190419114623"
  },
  {
      "displayText": "Minute_Maid_White_Grape-Pet-1250ml",
      "id": "2434",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/509.png?20190419114625"
  },
  {
      "displayText": "Fanta_Peach-Rgb-200ml",
      "id": "2437",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/510.png?20190419114628"
  },
  {
      "displayText": "Zero_Coca_Cola-Pet-500ml",
      "id": "2556",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/511.png?20190419114628"
  },
  {
      "displayText": "Yi_Quan_Soda_Water-Can-330ml",
      "id": "2603",
      "previewUrl": "https://portal.visioniot.cn/Products/Thumbnails/512.png?20190419114635"
  }
];

export default mockOptions;
