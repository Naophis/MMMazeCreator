var target = document.getElementById("map_data");
// var target2 = document.getElementById("map_data2");


var mc = new MazeCreator({
    size: 16,
    targetId: "map_data",
    scale: 0.75
});
mc.on("click", function (e) {
    console.log(e);
});


mc.on("change", function (e) {
    console.log(e);
});

mc.on("mouseover", function (e) {
    document.getElementById("postion").innerText = `(${e.x},${e.y})`;
});

document.getElementById("show").addEventListener("click", function () {
    mc.show();
});


document.getElementById("map_resultBtn").addEventListener("click", function () {
    var res = mc.exportAsString();

    document.getElementById("resultarea").value = res;

    var el = document.getElementById("modal");
    var className = "is-active";
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;

    document.getElementById("mBackGround").addEventListener("click", function () {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }, {
        once: true
    });
});

document.getElementById("map_create16").addEventListener("click", function () {
    mc = new MazeCreator({
        size: 16,
        targetId: "map_data",
    });

});

document.getElementById("map_create32").addEventListener("click", function () {
    mc = new MazeCreator({
        size: 32,
        targetId: "map_data",
        scale: 0.5
    });
});