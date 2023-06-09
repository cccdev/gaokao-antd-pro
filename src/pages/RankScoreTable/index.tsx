/**
 * @author 陆劲涛
 * @description 高考位次一分一段查询
 */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputNumber, Modal, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

import { AudioOutlined } from '@ant-design/icons';
// import { rankScoreLi, ranksWen } from '../mock/data';

const { Option } = Select;

/**一分一段表 */
type rankScore = [
  score: number, // 高考分数
  sameScoreCount: number, // 同分人数
  rank: number, // 位次
];

export const rankScoreLi: rankScore[] = [
  [692, 33, 33],
  [691, 8, 41],
  [690, 8, 49],
  [689, 6, 55],
  [688, 4, 59],
  [687, 10, 69],
  [686, 9, 78],
  [685, 5, 83],
  [684, 12, 95],
  [683, 12, 107],
  [682, 7, 114],
  [681, 18, 132],
  [680, 17, 149],
  [679, 11, 160],
  [678, 14, 174],
  [677, 13, 187],
  [676, 15, 202],
  [675, 23, 225],
  [674, 22, 247],
  [673, 15, 262],
  [672, 21, 283],
  [671, 28, 311],
  [670, 35, 346],
  [669, 24, 370],
  [668, 30, 400],
  [667, 34, 434],
  [666, 32, 466],
  [665, 32, 498],
  [664, 44, 542],
  [663, 36, 578],
  [662, 44, 622],
  [661, 46, 668],
  [660, 41, 709],
  [659, 51, 760],
  [658, 55, 815],
  [657, 63, 878],
  [656, 48, 926],
  [655, 60, 986],
  [654, 57, 1043],
  [653, 61, 1104],
  [652, 75, 1179],
  [651, 78, 1257],
  [650, 75, 1332],
  [649, 75, 1407],
  [648, 75, 1482],
  [647, 76, 1558],
  [646, 81, 1639],
  [645, 92, 1731],
  [644, 85, 1816],
  [643, 107, 1923],
  [642, 100, 2023],
  [641, 106, 2129],
  [640, 94, 2223],
  [639, 130, 2353],
  [638, 135, 2488],
  [637, 119, 2607],
  [636, 147, 2754],
  [635, 144, 2898],
  [634, 129, 3027],
  [633, 159, 3186],
  [632, 134, 3320],
  [631, 165, 3485],
  [630, 156, 3641],
  [629, 160, 3801],
  [628, 157, 3958],
  [627, 180, 4138],
  [626, 197, 4335],
  [625, 179, 4514],
  [624, 177, 4691],
  [623, 204, 4895],
  [622, 208, 5103],
  [621, 230, 5333],
  [620, 217, 5550],
  [619, 202, 5752],
  [618, 214, 5966],
  [617, 254, 6220],
  [616, 227, 6447],
  [615, 253, 6700],
  [614, 249, 6949],
  [613, 252, 7201],
  [612, 242, 7443],
  [611, 288, 7731],
  [610, 282, 8013],
  [609, 280, 8293],
  [608, 306, 8599],
  [607, 314, 8913],
  [606, 323, 9236],
  [605, 344, 9580],
  [604, 324, 9904],
  [603, 320, 10224],
  [602, 327, 10551],
  [601, 341, 10892],
  [600, 350, 11242],
  [599, 375, 11617],
  [598, 351, 11968],
  [597, 398, 12366],
  [596, 404, 12770],
  [595, 410, 13180],
  [594, 411, 13591],
  [593, 390, 13981],
  [592, 407, 14388],
  [591, 422, 14810],
  [590, 400, 15210],
  [589, 429, 15639],
  [588, 453, 16092],
  [587, 440, 16532],
  [586, 476, 17008],
  [585, 456, 17464],
  [584, 484, 17948],
  [583, 459, 18407],
  [582, 485, 18892],
  [581, 522, 19414],
  [580, 492, 19906],
  [579, 521, 20427],
  [578, 551, 20978],
  [577, 529, 21507],
  [576, 528, 22035],
  [575, 598, 22633],
  [574, 536, 23169],
  [573, 611, 23780],
  [572, 527, 24307],
  [571, 556, 24863],
  [570, 592, 25455],
  [569, 644, 26099],
  [568, 552, 26651],
  [567, 580, 27231],
  [566, 599, 27830],
  [565, 685, 28515],
  [564, 648, 29163],
  [563, 680, 29843],
  [562, 633, 30476],
  [561, 739, 31215],
  [560, 685, 31900],
  [559, 664, 32564],
  [558, 686, 33250],
  [557, 684, 33934],
  [556, 773, 34707],
  [555, 702, 35409],
  [554, 646, 36055],
  [553, 769, 36824],
  [552, 749, 37573],
  [551, 716, 38289],
  [550, 752, 39041],
  [549, 819, 39860],
  [548, 759, 40619],
  [547, 778, 41397],
  [546, 822, 42219],
  [545, 755, 42974],
  [544, 825, 43799],
  [543, 856, 44655],
  [542, 808, 45463],
  [541, 856, 46319],
  [540, 843, 47162],
  [539, 843, 48005],
  [538, 857, 48862],
  [537, 878, 49740],
  [536, 865, 50605],
  [535, 855, 51460],
  [534, 934, 52394],
  [533, 895, 53289],
  [532, 923, 54212],
  [531, 912, 55124],
  [530, 929, 56053],
  [529, 892, 56945],
  [528, 969, 57914],
  [527, 912, 58826],
  [526, 960, 59786],
  [525, 927, 60713],
  [524, 947, 61660],
  [523, 986, 62646],
  [522, 983, 63629],
  [521, 961, 64590],
  [520, 972, 65562],
  [519, 1015, 66577],
  [518, 1008, 67585],
  [517, 993, 68578],
  [516, 953, 69531],
  [515, 976, 70507],
  [514, 947, 71454],
  [513, 1017, 72471],
  [512, 1045, 73516],
  [511, 1069, 74585],
  [510, 1012, 75597],
  [509, 1014, 76611],
  [508, 1050, 77661],
  [507, 1068, 78729],
  [506, 1075, 79804],
  [505, 1062, 80866],
  [504, 1041, 81907],
  [503, 1160, 83067],
  [502, 1100, 84167],
  [501, 1087, 85254],
  [500, 1104, 86358],
  [499, 1092, 87450],
  [498, 1099, 88549],
  [497, 1120, 89669],
  [496, 1157, 90826],
  [495, 1183, 92009],
  [494, 1120, 93129],
  [493, 1150, 94279],
  [492, 1122, 95401],
  [491, 1175, 96576],
  [490, 1170, 97746],
  [489, 1170, 98916],
  [488, 1166, 100082],
  [487, 1124, 101206],
  [486, 1150, 102356],
  [485, 1122, 103478],
  [484, 1136, 104614],
  [483, 1204, 105818],
  [482, 1210, 107028],
  [481, 1171, 108199],
  [480, 1189, 109388],
  [479, 1218, 110606],
  [478, 1157, 111763],
  [477, 1209, 112972],
  [476, 1226, 114198],
  [475, 1140, 115338],
  [474, 1264, 116602],
  [473, 1239, 117841],
  [472, 1208, 119049],
  [471, 1192, 120241],
  [470, 1243, 121484],
  [469, 1202, 122686],
  [468, 1201, 123887],
  [467, 1250, 125137],
  [466, 1197, 126334],
  [465, 1272, 127606],
  [464, 1224, 128830],
  [463, 1221, 130051],
  [462, 1273, 131324],
  [461, 1229, 132553],
  [460, 1205, 133758],
  [459, 1263, 135021],
  [458, 1309, 136330],
  [457, 1191, 137521],
  [456, 1160, 138681],
  [455, 1274, 139955],
  [454, 1197, 141152],
  [453, 1296, 142448],
  [452, 1278, 143726],
  [451, 1239, 144965],
  [450, 1245, 146210],
  [449, 1243, 147453],
  [448, 1187, 148640],
  [447, 1250, 149890],
  [446, 1202, 151092],
  [445, 1258, 152350],
  [444, 1186, 153536],
  [443, 1205, 154741],
  [442, 1236, 155977],
  [441, 1213, 157190],
  [440, 1174, 158364],
  [439, 1162, 159526],
  [438, 1236, 160762],
  [437, 1218, 161980],
  [436, 1206, 163186],
  [435, 1227, 164413],
  [434, 1197, 165610],
  [433, 1186, 166796],
  [432, 1121, 167917],
  [431, 1186, 169103],
  [430, 1096, 170199],
  [429, 1128, 171327],
  [428, 1089, 172416],
  [427, 1167, 173583],
  [426, 1128, 174711],
  [425, 1145, 175856],
  [424, 1191, 177047],
  [423, 1099, 178146],
  [422, 1091, 179237],
  [421, 1032, 180269],
  [420, 1071, 181340],
  [419, 1042, 182382],
  [418, 1089, 183471],
  [417, 1016, 184487],
  [416, 1135, 185622],
  [415, 994, 186616],
  [414, 1009, 187625],
  [413, 1024, 188649],
  [412, 1038, 189687],
  [411, 967, 190654],
  [410, 983, 191637],
  [409, 1038, 192675],
  [408, 974, 193649],
  [407, 1002, 194651],
  [406, 962, 195613],
  [405, 929, 196542],
  [404, 868, 197410],
  [403, 1009, 198419],
  [402, 912, 199331],
  [401, 984, 200315],
  [400, 902, 201217],
  [399, 944, 202161],
  [398, 882, 203043],
  [397, 928, 203971],
  [396, 872, 204843],
  [395, 874, 205717],
  [394, 889, 206606],
  [393, 863, 207469],
  [392, 831, 208300],
  [391, 853, 209153],
  [390, 838, 209991],
  [389, 890, 210881],
  [388, 858, 211739],
  [387, 830, 212569],
  [386, 835, 213404],
  [385, 839, 214243],
  [384, 801, 215044],
  [383, 773, 215817],
  [382, 750, 216567],
  [381, 788, 217355],
  [380, 769, 218124],
  [379, 771, 218895],
  [378, 694, 219589],
  [377, 765, 220354],
  [376, 684, 221038],
  [375, 735, 221773],
  [374, 719, 222492],
  [373, 707, 223199],
  [372, 712, 223911],
  [371, 702, 224613],
  [370, 698, 225311],
  [369, 677, 225988],
  [368, 681, 226669],
  [367, 674, 227343],
  [366, 638, 227981],
  [365, 677, 228658],
  [364, 654, 229312],
  [363, 698, 230010],
  [362, 645, 230655],
  [361, 639, 231294],
  [360, 642, 231936],
  [359, 617, 232553],
  [358, 692, 233245],
  [357, 577, 233822],
  [356, 613, 234435],
  [355, 590, 235025],
  [354, 593, 235618],
  [353, 573, 236191],
  [352, 536, 236727],
  [351, 532, 237259],
  [350, 616, 237875],
  [349, 546, 238421],
  [348, 553, 238974],
  [347, 561, 239535],
  [346, 532, 240067],
  [345, 563, 240630],
  [344, 551, 241181],
  [343, 559, 241740],
  [342, 530, 242270],
  [341, 528, 242798],
  [340, 507, 243305],
  [339, 535, 243840],
  [338, 526, 244366],
  [337, 514, 244880],
  [336, 510, 245390],
  [335, 483, 245873],
  [334, 431, 246304],
  [333, 498, 246802],
  [332, 509, 247311],
  [331, 493, 247804],
  [330, 489, 248293],
  [329, 449, 248742],
  [328, 453, 249195],
  [327, 473, 249668],
  [326, 481, 250149],
  [325, 444, 250593],
  [324, 431, 251024],
  [323, 459, 251483],
  [322, 402, 251885],
  [321, 395, 252280],
  [320, 413, 252693],
  [319, 403, 253096],
  [318, 391, 253487],
  [317, 403, 253890],
  [316, 363, 254253],
  [315, 427, 254680],
  [314, 414, 255094],
  [313, 376, 255470],
  [312, 379, 255849],
  [311, 392, 256241],
  [310, 335, 256576],
  [309, 379, 256955],
  [308, 375, 257330],
  [307, 357, 257687],
  [306, 363, 258050],
  [305, 334, 258384],
  [304, 351, 258735],
  [303, 328, 259063],
  [302, 332, 259395],
  [301, 338, 259733],
  [300, 325, 260058],
  [299, 323, 260381],
  [298, 326, 260707],
  [297, 325, 261032],
  [296, 296, 261328],
  [295, 323, 261651],
  [294, 286, 261937],
  [293, 318, 262255],
  [292, 300, 262555],
  [291, 276, 262831],
  [290, 285, 263116],
  [289, 309, 263425],
  [288, 282, 263707],
  [287, 271, 263978],
  [286, 290, 264268],
  [285, 304, 264572],
  [284, 267, 264839],
  [283, 272, 265111],
  [282, 273, 265384],
  [281, 271, 265655],
  [280, 218, 265873],
  [279, 270, 266143],
  [278, 243, 266386],
  [277, 259, 266645],
  [276, 259, 266904],
  [275, 232, 267136],
  [274, 189, 267325],
  [273, 207, 267532],
  [272, 234, 267766],
  [271, 247, 268013],
  [270, 239, 268252],
  [269, 225, 268477],
  [268, 208, 268685],
  [267, 196, 268881],
  [266, 210, 269091],
  [265, 190, 269281],
  [264, 201, 269482],
  [263, 196, 269678],
  [262, 185, 269863],
  [261, 209, 270072],
  [260, 178, 270250],
  [259, 192, 270442],
  [258, 194, 270636],
  [257, 172, 270808],
  [256, 176, 270984],
  [255, 185, 271169],
  [254, 173, 271342],
  [253, 182, 271524],
  [252, 180, 271704],
  [251, 174, 271878],
  [250, 157, 272035],
  [249, 150, 272185],
  [248, 157, 272342],
  [247, 138, 272480],
  [246, 150, 272630],
  [245, 136, 272766],
  [244, 151, 272917],
  [243, 165, 273082],
  [242, 139, 273221],
  [241, 144, 273365],
  [240, 125, 273490],
  [239, 134, 273624],
  [238, 146, 273770],
  [237, 125, 273895],
  [236, 108, 274003],
  [235, 130, 274133],
  [234, 143, 274276],
  [233, 106, 274382],
  [232, 109, 274491],
  [231, 124, 274615],
  [230, 119, 274734],
  [229, 102, 274836],
  [228, 110, 274946],
  [227, 103, 275049],
  [226, 102, 275151],
  [225, 95, 275246],
  [224, 101, 275347],
  [223, 103, 275450],
  [222, 104, 275554],
  [221, 101, 275655],
  [220, 102, 275757],
  [219, 90, 275847],
  [218, 106, 275953],
  [217, 70, 276023],
  [216, 82, 276105],
  [215, 80, 276185],
  [214, 97, 276282],
  [213, 76, 276358],
  [212, 78, 276436],
  [211, 83, 276519],
  [210, 80, 276599],
  [209, 65, 276664],
  [208, 70, 276734],
  [207, 61, 276795],
  [206, 72, 276867],
  [205, 70, 276937],
  [204, 78, 277015],
  [203, 61, 277076],
  [202, 67, 277143],
  [201, 47, 277190],
  [200, 8872, 286062],
];
export const rankScoreWen: rankScore[] = [
  [637, 22, 22],
  [636, 5, 27],
  [635, 3, 30],
  [634, 5, 35],
  [633, 4, 39],
  [632, 4, 43],
  [631, 2, 45],
  [630, 5, 50],
  [629, 5, 55],
  [628, 7, 62],
  [627, 9, 71],
  [626, 8, 79],
  [625, 6, 85],
  [624, 7, 92],
  [623, 7, 99],
  [622, 12, 111],
  [621, 13, 124],
  [620, 15, 139],
  [619, 11, 150],
  [618, 14, 164],
  [617, 15, 179],
  [616, 18, 197],
  [615, 16, 213],
  [614, 21, 234],
  [613, 19, 253],
  [612, 24, 277],
  [611, 29, 306],
  [610, 26, 332],
  [609, 24, 356],
  [608, 42, 398],
  [607, 28, 426],
  [606, 29, 455],
  [605, 30, 485],
  [604, 32, 517],
  [603, 39, 556],
  [602, 46, 602],
  [601, 42, 644],
  [600, 56, 700],
  [599, 48, 748],
  [598, 49, 797],
  [597, 52, 849],
  [596, 57, 906],
  [595, 51, 957],
  [594, 80, 1037],
  [593, 60, 1097],
  [592, 76, 1173],
  [591, 65, 1238],
  [590, 72, 1310],
  [589, 88, 1398],
  [588, 79, 1477],
  [587, 83, 1560],
  [586, 89, 1649],
  [585, 100, 1749],
  [584, 114, 1863],
  [583, 110, 1973],
  [582, 108, 2081],
  [581, 109, 2190],
  [580, 102, 2292],
  [579, 113, 2405],
  [578, 139, 2544],
  [577, 135, 2679],
  [576, 127, 2806],
  [575, 143, 2949],
  [574, 157, 3106],
  [573, 158, 3264],
  [572, 151, 3415],
  [571, 140, 3555],
  [570, 172, 3727],
  [569, 160, 3887],
  [568, 192, 4079],
  [567, 175, 4254],
  [566, 228, 4482],
  [565, 174, 4656],
  [564, 239, 4895],
  [563, 216, 5111],
  [562, 212, 5323],
  [561, 243, 5566],
  [560, 244, 5810],
  [559, 257, 6067],
  [558, 247, 6314],
  [557, 287, 6601],
  [556, 271, 6872],
  [555, 269, 7141],
  [554, 287, 7428],
  [553, 315, 7743],
  [552, 282, 8025],
  [551, 312, 8337],
  [550, 316, 8653],
  [549, 339, 8992],
  [548, 363, 9355],
  [547, 377, 9732],
  [546, 372, 10104],
  [545, 361, 10465],
  [544, 393, 10858],
  [543, 430, 11288],
  [542, 421, 11709],
  [541, 418, 12127],
  [540, 441, 12568],
  [539, 456, 13024],
  [538, 447, 13471],
  [537, 480, 13951],
  [536, 496, 14447],
  [535, 491, 14938],
  [534, 511, 15449],
  [533, 500, 15949],
  [532, 528, 16477],
  [531, 522, 16999],
  [530, 584, 17583],
  [529, 562, 18145],
  [528, 595, 18740],
  [527, 587, 19327],
  [526, 599, 19926],
  [525, 611, 20537],
  [524, 595, 21132],
  [523, 651, 21783],
  [522, 630, 22413],
  [521, 631, 23044],
  [520, 677, 23721],
  [519, 662, 24383],
  [518, 631, 25014],
  [517, 674, 25688],
  [516, 668, 26356],
  [515, 664, 27020],
  [514, 651, 27671],
  [513, 716, 28387],
  [512, 703, 29090],
  [511, 699, 29789],
  [510, 678, 30467],
  [509, 685, 31152],
  [508, 750, 31902],
  [507, 780, 32682],
  [506, 785, 33467],
  [505, 759, 34226],
  [504, 739, 34965],
  [503, 730, 35695],
  [502, 727, 36422],
  [501, 819, 37241],
  [500, 753, 37994],
  [499, 778, 38772],
  [498, 754, 39526],
  [497, 811, 40337],
  [496, 751, 41088],
  [495, 778, 41866],
  [494, 776, 42642],
  [493, 741, 43383],
  [492, 732, 44115],
  [491, 744, 44859],
  [490, 696, 45555],
  [489, 717, 46272],
  [488, 733, 47005],
  [487, 700, 47705],
  [486, 710, 48415],
  [485, 746, 49161],
  [484, 728, 49889],
  [483, 673, 50562],
  [482, 699, 51261],
  [481, 717, 51978],
  [480, 711, 52689],
  [479, 732, 53421],
  [478, 710, 54131],
  [477, 688, 54819],
  [476, 666, 55485],
  [475, 720, 56205],
  [474, 680, 56885],
  [473, 648, 57533],
  [472, 706, 58239],
  [471, 674, 58913],
  [470, 614, 59527],
  [469, 635, 60162],
  [468, 641, 60803],
  [467, 695, 61498],
  [466, 685, 62183],
  [465, 654, 62837],
  [464, 652, 63489],
  [463, 633, 64122],
  [462, 684, 64806],
  [461, 646, 65452],
  [460, 663, 66115],
  [459, 613, 66728],
  [458, 656, 67384],
  [457, 648, 68032],
  [456, 632, 68664],
  [455, 702, 69366],
  [454, 582, 69948],
  [453, 620, 70568],
  [452, 601, 71169],
  [451, 574, 71743],
  [450, 625, 72368],
  [449, 587, 72955],
  [448, 628, 73583],
  [447, 634, 74217],
  [446, 593, 74810],
  [445, 575, 75385],
  [444, 603, 75988],
  [443, 641, 76629],
  [442, 615, 77244],
  [441, 608, 77852],
  [440, 629, 78481],
  [439, 580, 79061],
  [438, 589, 79650],
  [437, 566, 80216],
  [436, 595, 80811],
  [435, 636, 81447],
  [434, 588, 82035],
  [433, 595, 82630],
  [432, 582, 83212],
  [431, 617, 83829],
  [430, 619, 84448],
  [429, 647, 85095],
  [428, 623, 85718],
  [427, 584, 86302],
  [426, 609, 86911],
  [425, 614, 87525],
  [424, 613, 88138],
  [423, 635, 88773],
  [422, 617, 89390],
  [421, 641, 90031],
  [420, 630, 90661],
  [419, 637, 91298],
  [418, 619, 91917],
  [417, 641, 92558],
  [416, 620, 93178],
  [415, 679, 93857],
  [414, 602, 94459],
  [413, 658, 95117],
  [412, 640, 95757],
  [411, 646, 96403],
  [410, 617, 97020],
  [409, 636, 97656],
  [408, 668, 98324],
  [407, 598, 98922],
  [406, 625, 99547],
  [405, 673, 100220],
  [404, 642, 100862],
  [403, 664, 101526],
  [402, 654, 102180],
  [401, 679, 102859],
  [400, 678, 103537],
  [399, 678, 104215],
  [398, 604, 104819],
  [397, 660, 105479],
  [396, 618, 106097],
  [395, 653, 106750],
  [394, 650, 107400],
  [393, 642, 108042],
  [392, 650, 108692],
  [391, 655, 109347],
  [390, 621, 109968],
  [389, 627, 110595],
  [388, 700, 111295],
  [387, 667, 111962],
  [386, 688, 112650],
  [385, 624, 113274],
  [384, 628, 113902],
  [383, 663, 114565],
  [382, 636, 115201],
  [381, 628, 115829],
  [380, 649, 116478],
  [379, 601, 117079],
  [378, 670, 117749],
  [377, 613, 118362],
  [376, 654, 119016],
  [375, 653, 119669],
  [374, 633, 120302],
  [373, 610, 120912],
  [372, 608, 121520],
  [371, 604, 122124],
  [370, 614, 122738],
  [369, 585, 123323],
  [368, 568, 123891],
  [367, 597, 124488],
  [366, 567, 125055],
  [365, 607, 125662],
  [364, 554, 126216],
  [363, 568, 126784],
  [362, 593, 127377],
  [361, 492, 127869],
  [360, 506, 128375],
  [359, 573, 128948],
  [358, 565, 129513],
  [357, 543, 130056],
  [356, 557, 130613],
  [355, 551, 131164],
  [354, 498, 131662],
  [353, 520, 132182],
  [352, 507, 132689],
  [351, 509, 133198],
  [350, 502, 133700],
  [349, 505, 134205],
  [348, 494, 134699],
  [347, 515, 135214],
  [346, 474, 135688],
  [345, 486, 136174],
  [344, 487, 136661],
  [343, 459, 137120],
  [342, 466, 137586],
  [341, 465, 138051],
  [340, 446, 138497],
  [339, 452, 138949],
  [338, 427, 139376],
  [337, 395, 139771],
  [336, 434, 140205],
  [335, 439, 140644],
  [334, 417, 141061],
  [333, 377, 141438],
  [332, 382, 141820],
  [331, 425, 142245],
  [330, 358, 142603],
  [329, 356, 142959],
  [328, 384, 143343],
  [327, 400, 143743],
  [326, 388, 144131],
  [325, 381, 144512],
  [324, 385, 144897],
  [323, 375, 145272],
  [322, 348, 145620],
  [321, 363, 145983],
  [320, 314, 146297],
  [319, 342, 146639],
  [318, 312, 146951],
  [317, 282, 147233],
  [316, 311, 147544],
  [315, 318, 147862],
  [314, 309, 148171],
  [313, 308, 148479],
  [312, 324, 148803],
  [311, 302, 149105],
  [310, 322, 149427],
  [309, 309, 149736],
  [308, 303, 150039],
  [307, 277, 150316],
  [306, 284, 150600],
  [305, 278, 150878],
  [304, 257, 151135],
  [303, 244, 151379],
  [302, 302, 151681],
  [301, 251, 151932],
  [300, 268, 152200],
  [299, 259, 152459],
  [298, 234, 152693],
  [297, 259, 152952],
  [296, 269, 153221],
  [295, 255, 153476],
  [294, 200, 153676],
  [293, 229, 153905],
  [292, 216, 154121],
  [291, 227, 154348],
  [290, 233, 154581],
  [289, 204, 154785],
  [288, 196, 154981],
  [287, 195, 155176],
  [286, 205, 155381],
  [285, 202, 155583],
  [284, 244, 155827],
  [283, 178, 156005],
  [282, 211, 156216],
  [281, 195, 156411],
  [280, 201, 156612],
  [279, 196, 156808],
  [278, 169, 156977],
  [277, 184, 157161],
  [276, 184, 157345],
  [275, 154, 157499],
  [274, 161, 157660],
  [273, 172, 157832],
  [272, 163, 157995],
  [271, 181, 158171],
  [270, 183, 158359],
  [269, 139, 158498],
  [268, 158, 158656],
  [267, 132, 158788],
  [266, 158, 158946],
  [265, 175, 159121],
  [264, 140, 159261],
  [263, 154, 159415],
  [262, 123, 159538],
  [261, 147, 159685],
  [260, 143, 159828],
  [259, 150, 159978],
  [258, 118, 160096],
  [257, 131, 160227],
  [256, 128, 160355],
  [255, 143, 160498],
  [254, 135, 160633],
  [253, 121, 160754],
  [252, 141, 160895],
  [251, 112, 161007],
  [250, 146, 161153],
  [249, 120, 161273],
  [248, 115, 161388],
  [247, 115, 161503],
  [246, 118, 161621],
  [245, 111, 161732],
  [244, 109, 161841],
  [243, 112, 161953],
  [242, 110, 162063],
  [241, 116, 162179],
  [240, 121, 162300],
  [239, 110, 162410],
  [238, 120, 162530],
  [237, 108, 162638],
  [236, 93, 162731],
  [235, 103, 162834],
  [234, 104, 162938],
  [233, 77, 163015],
  [232, 103, 163118],
  [231, 111, 163229],
  [230, 107, 163336],
  [229, 114, 163450],
  [228, 98, 163548],
  [227, 102, 163650],
  [226, 90, 163740],
  [225, 89, 163829],
  [224, 86, 163915],
  [223, 95, 164010],
  [222, 87, 164097],
  [221, 66, 164163],
  [220, 98, 164261],
  [219, 111, 164372],
  [218, 70, 164442],
  [217, 83, 164525],
  [216, 91, 164616],
  [215, 97, 164713],
  [214, 78, 164791],
  [213, 81, 164872],
  [212, 83, 164955],
  [211, 71, 165026],
  [210, 73, 165099],
  [209, 78, 165177],
  [208, 100, 165277],
  [207, 71, 165348],
  [206, 87, 165435],
  [205, 72, 165507],
  [204, 81, 165588],
  [203, 56, 165644],
  [202, 68, 165712],
  [201, 84, 165796],
  [200, 17015, 182811],
];

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export class RankQueryProps {}

const RankQuery: React.FC<RankQueryProps> = (props) => {
  const onFinish = (formData: { rank: number; subject: '理科' | '文科' }) => {
    let score = 0;
    if (formData.subject === '理科') {
      for (const key of rankScoreLi) {
        let row = key[2];
        if (row > formData.rank) {
          score = key[0];
          break;
        }
      }
    } else {
      for (const key of ranksWen) {
        let row = key[2];
        if (row > formData.rank) {
          score = key[0];
          break;
        }
      }
    }
    console.log('Success:', formData);
    console.log('等位分:', score);
    setSameScore(score);
    setIsModalOpen(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [rank, setRank] = useState<number>();
  const [sameScore, setSameScore] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  return (
    <PageContainer>
      <Card
        className="shadow-xl w-1/2 rounded-xl"
        bodyStyle={{
          backgroundImage: 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className=" max-w-xl"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="文/理科"
              name="subject"
              rules={[{ required: true, message: '请选择文理科！' }]}
            >
              <Select>
                <Option value="理科">理科</Option>
                <Option value="文科">文科</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="高考位次"
              name="rank"
              rules={[
                {
                  type: 'number',
                  min: 1,
                  message: '高考位次必须大于0！',
                },
              ]}
            >
              <InputNumber
                className="w-auto"
                placeholder="请输入高考位次"
                value={rank}
                onChange={(e: any) => setRank(e)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
          <Modal
            title="查询结果"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <p>
              您的位次是:{rank}，等位分是{sameScore}
            </p>
          </Modal>
          <br />
        </div>
      </Card>
    </PageContainer>
  );
};

RankQuery.defaultProps = new RankQueryProps();
export default RankQuery;
