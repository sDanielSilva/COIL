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

  // Adicione os tilesets
  const tileset1 = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2588151)
  );
  const tileset2 = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2587289)
  );

  const tileset3 = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2588138)
  );

  // Obtenha as esferas delimitadoras de cada tileset
  const boundingSphere1 = tileset1.root.boundingSphere;
  const boundingSphere2 = tileset2.root.boundingSphere;
  const boundingSphere3 = tileset3.root.boundingSphere;

  // Calcule a esfera delimitadora que engloba ambas as esferas delimitadoras
  const boundingSphere = Cesium.BoundingSphere.union(
    boundingSphere1,
    boundingSphere2,
    boundingSphere3
  );

  // Voe para a esfera delimitadora que engloba ambas as esferas delimitadoras
  viewer.camera.flyToBoundingSphere(boundingSphere);

  const dtm1 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2587558)
  );

  const dtm2 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2588152)
  );

  const dtm3 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2588195)
  );

  const dsm1 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2587562)
  );

  const dsm2 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2588154)
  );

  const dsm3 = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(2588194)
  );

  let treesAdded = false;
  let dataSource1, dataSource2;

  const checkbox_arvores = document.getElementById("arvores");
  const counter = document.getElementById("counter");

  checkbox_arvores.addEventListener("change", async (event) => {
    if (event.target.checked) {
      if (!treesAdded) {
        const arvores1 = await Cesium.IonResource.fromAssetId(2587574);
        const arvores2 = await Cesium.IonResource.fromAssetId(2588181);
        const arvores3 = await Cesium.IonResource.fromAssetId(2588196);

        dataSource1 = await Cesium.GeoJsonDataSource.load(arvores1, {
          clampToGround: true,
        });
        dataSource2 = await Cesium.GeoJsonDataSource.load(arvores2, {
          clampToGround: true,
        });
        dataSource3 = await Cesium.GeoJsonDataSource.load(arvores3, {
          clampToGround: true,
        });

        viewer.dataSources.add(dataSource1);
        viewer.dataSources.add(dataSource2);
        viewer.dataSources.add(dataSource3);

        [dataSource1, dataSource2, dataSource3].forEach((dataSource) => {
          dataSource.entities.values.forEach(function (entity) {
            entity.point = new Cesium.PointGraphics({
              color: Cesium.Color.GREENYELLOW,
              pixelSize: 6,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            });
          });
        });

        treesAdded = true;
      }

      dataSource1.show = true;
      dataSource2.show = true;
      dataSource3.show = true;
      counter.style.display = "block";
    } else {
      dataSource1.show = false;
      dataSource2.show = false;
      dataSource3.show = false;
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
      tileset1.show = true;
      tileset2.show = true;
      tileset3.show = true;
    } else {
      tileset1.show = false;
      tileset2.show = false;
      tileset3.show = false;
    }
  });

  checkbox_dtm.addEventListener("change", (event) => {
    if (event.target.checked) {
      fadeIn(dtm1, dtm2, dtm3);
    } else {
      fadeOut(dtm1, dtm2, dtm3);
    }
  });

  checkbox_dsm.addEventListener("change", (event) => {
    if (event.target.checked) {
      fadeIn(dsm1, dsm2, dsm3);
    } else {
      fadeOut(dsm1, dsm2, dsm3);
    }
  });

  let isAnimating = false;

  function fadeIn(...layers) {
    if (isAnimating) return;
    isAnimating = true;

    layers.forEach((layer) => {
      layer.show = true;
      layer.alpha = 0;
    });

    viewer.scene.requestRender();
    viewer.scene.postRender.addEventListener(function () {
      layers.forEach((layer) => {
        layer.alpha += 0.014;
        if (layer.alpha >= 1) {
          viewer.scene.postRender.removeEventListener(arguments.callee);
          isAnimating = false;
        }
      });
      viewer.scene.requestRender();
    });
  }

  function fadeOut(...layers) {
    if (isAnimating) return;
    isAnimating = true;

    layers.forEach((layer) => {
      layer.alpha = 1;
    });

    viewer.scene.requestRender();
    viewer.scene.postRender.addEventListener(function () {
      layers.forEach((layer) => {
        layer.alpha -= 0.014;
        if (layer.alpha <= 0) {
          layer.show = false;
          viewer.scene.postRender.removeEventListener(arguments.callee);
          isAnimating = false;
        }
      });
      viewer.scene.requestRender();
    });
  }
})();
