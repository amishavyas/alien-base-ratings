// 6 species x 2 illustrations versions x 12 random part color combinations

const allStim = [
    [
        "alien_1_v1_0001.png",
        "alien_1_v1_0002.png",
        "alien_1_v1_0003.png",
        "alien_1_v1_0004.png",
        "alien_1_v1_0005.png",
        "alien_1_v1_0006.png",
        "alien_1_v1_0007.png",
        "alien_1_v1_0008.png",
        "alien_1_v1_0009.png",
        "alien_1_v1_0010.png",
        "alien_1_v1_0011.png",
        "alien_1_v1_0012.png",
    ],
    [
        "alien_1_v2_0001.png",
        "alien_1_v2_0002.png",
        "alien_1_v2_0003.png",
        "alien_1_v2_0004.png",
        "alien_1_v2_0005.png",
        "alien_1_v2_0006.png",
        "alien_1_v2_0007.png",
        "alien_1_v2_0008.png",
        "alien_1_v2_0009.png",
        "alien_1_v2_0010.png",
        "alien_1_v2_0011.png",
        "alien_1_v2_0012.png",
    ],
    [
        "alien_2_v1_0001.png",
        "alien_2_v1_0002.png",
        "alien_2_v1_0003.png",
        "alien_2_v1_0004.png",
        "alien_2_v1_0005.png",
        "alien_2_v1_0006.png",
        "alien_2_v1_0007.png",
        "alien_2_v1_0008.png",
        "alien_2_v1_0009.png",
        "alien_2_v1_0010.png",
        "alien_2_v1_0011.png",
        "alien_2_v1_0012.png",
    ],
    [
        "alien_2_v2_0001.png",
        "alien_2_v2_0002.png",
        "alien_2_v2_0003.png",
        "alien_2_v2_0004.png",
        "alien_2_v2_0005.png",
        "alien_2_v2_0006.png",
        "alien_2_v2_0007.png",
        "alien_2_v2_0008.png",
        "alien_2_v2_0009.png",
        "alien_2_v2_0010.png",
        "alien_2_v2_0011.png",
        "alien_2_v2_0012.png",
    ],
    [
        "alien_3_v1_0001.png",
        "alien_3_v1_0002.png",
        "alien_3_v1_0003.png",
        "alien_3_v1_0004.png",
        "alien_3_v1_0005.png",
        "alien_3_v1_0006.png",
        "alien_3_v1_0007.png",
        "alien_3_v1_0008.png",
        "alien_3_v1_0009.png",
        "alien_3_v1_0010.png",
        "alien_3_v1_0011.png",
        "alien_3_v1_0012.png",
    ],
    [
        "alien_3_v2_0001.png",
        "alien_3_v2_0002.png",
        "alien_3_v2_0003.png",
        "alien_3_v2_0004.png",
        "alien_3_v2_0005.png",
        "alien_3_v2_0006.png",
        "alien_3_v2_0007.png",
        "alien_3_v2_0008.png",
        "alien_3_v2_0009.png",
        "alien_3_v2_0010.png",
        "alien_3_v2_0011.png",
        "alien_3_v2_0012.png",
    ],
    [
        "alien_4_v1_0001.png",
        "alien_4_v1_0002.png",
        "alien_4_v1_0003.png",
        "alien_4_v1_0004.png",
        "alien_4_v1_0005.png",
        "alien_4_v1_0006.png",
        "alien_4_v1_0007.png",
        "alien_4_v1_0008.png",
        "alien_4_v1_0009.png",
        "alien_4_v1_0010.png",
        "alien_4_v1_0011.png",
        "alien_4_v1_0012.png",
    ],
    [
        "alien_4_v2_0001.png",
        "alien_4_v2_0002.png",
        "alien_4_v2_0003.png",
        "alien_4_v2_0004.png",
        "alien_4_v2_0005.png",
        "alien_4_v2_0006.png",
        "alien_4_v2_0007.png",
        "alien_4_v2_0008.png",
        "alien_4_v2_0009.png",
        "alien_4_v2_0010.png",
        "alien_4_v2_0011.png",
        "alien_4_v2_0012.png",
    ],
    [
        "alien_5_v1_0001.png",
        "alien_5_v1_0002.png",
        "alien_5_v1_0003.png",
        "alien_5_v1_0004.png",
        "alien_5_v1_0005.png",
        "alien_5_v1_0006.png",
        "alien_5_v1_0007.png",
        "alien_5_v1_0008.png",
        "alien_5_v1_0009.png",
        "alien_5_v1_0010.png",
        "alien_5_v1_0011.png",
        "alien_5_v1_0012.png",
    ],
    [
        "alien_5_v2_0001.png",
        "alien_5_v2_0002.png",
        "alien_5_v2_0003.png",
        "alien_5_v2_0004.png",
        "alien_5_v2_0005.png",
        "alien_5_v2_0006.png",
        "alien_5_v2_0007.png",
        "alien_5_v2_0008.png",
        "alien_5_v2_0009.png",
        "alien_5_v2_0010.png",
        "alien_5_v2_0011.png",
        "alien_5_v2_0012.png",
    ],
    [
        "alien_6_v1_0001.png",
        "alien_6_v1_0002.png",
        "alien_6_v1_0003.png",
        "alien_6_v1_0004.png",
        "alien_6_v1_0005.png",
        "alien_6_v1_0006.png",
        "alien_6_v1_0007.png",
        "alien_6_v1_0008.png",
        "alien_6_v1_0009.png",
        "alien_6_v1_0010.png",
        "alien_6_v1_0011.png",
        "alien_6_v1_0012.png",
    ],
    [
        "alien_6_v2_0001.png",
        "alien_6_v2_0002.png",
        "alien_6_v2_0003.png",
        "alien_6_v2_0004.png",
        "alien_6_v2_0005.png",
        "alien_6_v2_0006.png",
        "alien_6_v2_0007.png",
        "alien_6_v2_0008.png",
        "alien_6_v2_0009.png",
        "alien_6_v2_0010.png",
        "alien_6_v2_0011.png",
        "alien_6_v2_0012.png",
    ],
];

const stimSubset = []; 

for (var alienType of allStim) {
    const max = 11;
    var index = Math.floor(Math.random() * (max + 1));
    stimSubset.push(alienType[index]); 
}

stimSubset.sort(() => Math.random() - 0.5);

export default stimSubset;