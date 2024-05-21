// main.js
(async function () {
  // Cesium ion credentials (only needed if you don't want to create yourself the tileset).
  // Check your AccessToken in Cesium Ion.
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0N2ZmMGFlNS01MTdjLTQ0M2UtYTY1Mi0wY2JhYjUwNjNmOGMiLCJpZCI6MjE2NzMwLCJpYXQiOjE3MTYyODcwNDR9.kZ-qUEewUHDrSWLHZ42X9XjIVfRsMKOaYa2aPu0KuBM";

  //Next lines are for creating the scene - terrain providers and layer switcher

  var terrain = Cesium.createDefaultTerrainProviderViewModels();

  /* Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps */
  let CartoAttribution =
    'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.';

  // Create ProviderViewModel based on different imagery sources
  // - these can be used without Cesium Ion
  var imageryViewModels = [];
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "OpenStreetMap",
      iconUrl: Cesium.buildModuleUrl(
        "Widgets/Images/ImageryProviders/openStreetMap.png"
      ),
      tooltip:
        "OpenStreetMap (OSM) is a collaborative project to create a free editable \
  map of the world.\nhttps://www.openstreetmap.org",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: "abc",
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Positron",
      tooltip: "CartoDB Positron basemap",
      iconUrl: "https://a.basemaps.cartocdn.com/light_all/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Positron without labels",
      tooltip: "CartoDB Positron without labels basemap",
      iconUrl:
        "https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );

  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Dark Matter without labels",
      tooltip: "CartoDB Dark Matter without labels basemap",
      iconUrl:
        "https://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Voyager",
      tooltip: "CartoDB Voyager basemap",
      iconUrl:
        "https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Voyager without labels",
      tooltip: "CartoDB Voyager without labels basemap",
      iconUrl:
        "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );
/*   imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "National Map Satellite",
      iconUrl:
        "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/4/6/4",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
          credit:
            'Tile data from <a href="https://basemap.nationalmap.gov/">USGS</a>',
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  ); */
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: "Dark Matter",
      tooltip: "CartoDB Dark Matter basemap",
      iconUrl:
        "https://a.basemaps.cartocdn.com/rastertiles/dark_all/5/15/12.png",
      creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
          credit: CartoAttribution,
          minimumLevel: 0,
          maximumLevel: 22,
        });
      },
    })
  );

  // Initialize the viewer
  viewer = new Cesium.Viewer("cesiumContainer", {
    sceneModePicker: false,
    imageryProviderViewModels: imageryViewModels,
    selectedImageryProviderViewModel: imageryViewModels[2],
    geocoder: false,
    animation: false,
    timeline: false,
    infoBox: false,
    homeButton: false,
    selectionIndicator: false,
    fullscreenButton: true,
    selectionIndicator: false,
    selectedTerrainProviderViewModel: terrain[1],
  });

  viewer.camera.setView({
    orientation: {
      heading: Cesium.Math.toRadians(10),
      pitch: Cesium.Math.toRadians(-10),
    },
  });

  //Enable lighting. You can comment the following line to see the effect.
  //Better - you can transform this in a checkbox

  viewer.scene.globe.enableLighting = true;
  const checkbox_lighting = document.getElementById("lighting");

  checkbox_lighting.addEventListener("change", (event) => {
    viewer.scene.globe.enableLighting = event.target.checked;
  });

  //Add the tiles and the DTN/DSM

  const tileset_mafra = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2587289)
  );
  viewer.camera.flyToBoundingSphere(tileset_mafra.root.boundingSphere);

  const dtm_mafra = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2587558)
  );

  const dsm_mafra = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2587562)
  );

  let treesAdded = false;

  const checkbox_arvores = document.getElementById("arvores");
  const counter = document.getElementById("counter");

  checkbox_arvores.addEventListener("change", async (event) => {
    if (event.target.checked) {
      if (!treesAdded) {
        const arvores = await Cesium.IonResource.fromAssetId(2587574);
        dataSource = await Cesium.GeoJsonDataSource.load(arvores, {
          clampToGround: true,
        });

        viewer.dataSources.add(dataSource);

        dataSource.entities.values.forEach(function (entity) {
          entity.point = new Cesium.PointGraphics({
            color: Cesium.Color.GREENYELLOW,
            pixelSize: 6,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          });
        });

        treesAdded = true;
      }

      dataSource.show = true;
      counter.style.display = "block";
    } else {
      dataSource.show = false;
      counter.style.display = "none";
    }
  });

  //Google Photorealistic 3D Tiles

  /*   const gtileset = viewer.scene.primitives.add(
  await Cesium.Cesium3DTileset.fromIonAssetId(2275207),
  ); */

  viewer.scene.globe.depthTestAgainstTerrain = true;

  //Cesium OSM buildings
  const tileset = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(96188)
  );

  // And finally, the code for the checkboxes
  const checkbox_tileset = document.getElementById("tileset");
  const checkbox_dsm = document.getElementById("dsm");
  const checkbox_dtm = document.getElementById("dtm");

  checkbox_tileset.addEventListener("change", (event) => {
    if (event.target.checked) {
      tileset_mafra.show = true;
    } else {
      tileset_mafra.show = false;
    }
  });

  checkbox_dtm.addEventListener("change", (event) => {
    if (event.target.checked) {
      fadeIn(dtm_mafra);
    } else {
      fadeOut(dtm_mafra);
    }
  });

  checkbox_dsm.addEventListener("change", (event) => {
    if (event.target.checked) {
      fadeIn(dsm_mafra);
    } else {
      fadeOut(dsm_mafra);
    }
  });

  let isAnimating = false;

  function fadeIn(layer) {
    if (isAnimating) return;
    isAnimating = true;

    layer.show = true;
    layer.alpha = 0;
    viewer.scene.requestRender();
    viewer.scene.postRender.addEventListener(function () {
      layer.alpha += 0.014;
      if (layer.alpha >= 1) {
        viewer.scene.postRender.removeEventListener(arguments.callee);
        isAnimating = false;
      }
      viewer.scene.requestRender();
    });
  }

  function fadeOut(layer) {
    if (isAnimating) return;
    isAnimating = true;

    layer.alpha = 1;
    viewer.scene.requestRender();
    viewer.scene.postRender.addEventListener(function () {
      layer.alpha -= 0.014;
      if (layer.alpha <= 0) {
        layer.show = false;
        viewer.scene.postRender.removeEventListener(arguments.callee);
        isAnimating = false;
      }
      viewer.scene.requestRender();
    });
  }
})();
