$(document).ready(function () {
    map = new mapController(16);
    $("#map_resultBtn").on("click", function () {
        getMapData();
    });
    $("#map_create16").on("click", function () {
        map = new mapController(16);
    });
    $("#map_create32").on("click", function () {
        map = new mapController(32);
    });
});