var s = Snap(1200, 1200);
var Items_Research = [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1]
];

var Items_Disorder = [
    [0, 1, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1]
];


Fill_Grid_Disp(4, Items_Research, 0);
Fill_Grid(4, Items_Disorder, 500);

function Fill_Grid(size, Items, shift) {

    for (var i = 0; i < size; i++) {

        for (var j = 0; j < size; j++) {
            if (Items[i][j] == 1) {
                k = (i * 100);
                l = (j * 100) + shift;
                Items[i][j] = s.rect(k, l, 90, 90)
                    .attr({
                        fill: 'lightblue',
                        stroke: '#c5d8d5',
                        strokeWidth: 4
                    })
                    .data("i", i)
                    .data("j", j)
                    .data("item", Items[i][j])
                    .click(function() {
                        var line = this.data("i");
                        var column = this.data("j");
                        Reverse(line, column, 0, size);
                    });
            }
            if (Items[i][j] == 0) {
                k = (i * 100);
                l = (j * 100) + shift;
                Items[i][j] = s.rect(k, l, 90, 90)
                    .attr({
                        fill: 'lightgreen',
                        stroke: '#c5d8d5',
                        strokeWidth: 4
                    })
                    .data("i", i)
                    .data("j", j)
                    .data("item", Items[i][j])
                    .click(function() {
                        var line = this.data("i");
                        var column = this.data("j");
                        Reverse(line, column, 1, size);
                    });
            }

        }
    }
}

function Fill_Grid_Disp(size, Items, shift) {

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (Items[i][j] == 1) {
                k = (i * 100);
                l = (j * 100) + shift;
                Items[i][j] = s.rect(k, l, 90, 90)
                    .attr({
                        fill: 'lightblue',
                        stroke: '#c5d8d5',
                        strokeWidth: 4
                    })
                    .data("item", Items[i][j])
            }
            if (Items[i][j] == 0) {
                k = (i * 100);
                l = (j * 100) + shift;
                Items[i][j] = s.rect(k, l, 90, 90)
                    .attr({
                        fill: 'lightgreen',
                        stroke: '#c5d8d5',
                        strokeWidth: 4
                    })
                    .data("item", Items[i][j])
            }
        }
    }
}


function Reverse(line, column, invert, size) {

    var max_x = size;
    var max_y = size;
    for (var dx = (line <= 0 ? 0 : -1); dx <= (line >= 3 ? 0 : 1); ++dx) {
        for (var dy = (column <= 0 ? 0 : -1); dy <= (column >= 3 ? 0 : 1); ++dy) {
            if (dx != 0 || dy != 0) {
                var invert_adjacent = Items_Disorder[line + dx][column + dy].data("item");
                if (invert_adjacent == 0) {
                    Items_Disorder[line + dx][column + dy] = 1;
                } else {
                    Items_Disorder[line + dx][column + dy] = 0;
                }
            }
        }
    }
    Items_Disorder[line][column] = invert;
    Fill_Grid(4, Items_Disorder, 500);
    Compare(Items_Research, Items_Disorder);

}

function Compare(Items_Research, Items_Disorder) {
    for (var x = 0; x < Items_Research.length; x++) {
        for (var y = 0; y < Items_Research.length; y++) {
            if (Items_Research[x][y].data("item") != Items_Disorder[x][y].data("item")) {
                return false;
            }
        }
    }
    alert("OUI");
    return true;
}