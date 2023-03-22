const hexMap = [
    [25, 34, 42, 49, 55],
    [3, 9, 15, 26, 35, 43, 50, 56],
    [4, 10, 16, 27, 36, 44, 51, 57],
    [5, 11, 17, 28, 37, 45, 52, 58, 60],
    [6, 12, 18, 29, 38, 46, 53, 59],
    [7, 13, 19, 30, 39, 47, 54],
    [8, 14, 20, 31, 40, 48],
    [21, 32, 41],
    [22, 33],
    [23, 24]
]


const demiPlaneList = [
    {
        roll: 1,
        name: "Plane of Air"
    },
    {
        roll: 2,
        name: "Plane of Earth"
    },
    {
        roll: 3,
        name: "Plane of Fire"
    },
    {
        roll: 4,
        name: "Plane of Ice"
    },
    {
        roll: 5,
        name: "Plane of Shadow"
    },
    {
        roll: 6,
        name: "The Forbidden Zone"
    }
]

module.exports = { hexMap, demiPlaneList };