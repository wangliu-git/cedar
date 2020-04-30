<template>
  <div>
      <el-cascader
    :options="options"
    :props="{ checkStrictly: true }"
    clearable></el-cascader>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      options: [
        {
          value: "成熟T和NK细胞淋巴瘤",
          label: "成熟T和NK细胞淋巴瘤",
          children: [
            {
              value: "T细胞淋巴瘤（亚型无法确定）",
              label: "T细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "T幼淋巴细胞白血病",
              label: "T幼淋巴细胞白血病"
            },
            {
              value: "T大颗粒淋巴细胞白血病",
              label: "T大颗粒淋巴细胞白血病"
            },
            {
              value: "NK细胞慢性淋巴增殖性疾病",
              label: "NK细胞慢性淋巴增殖性疾病"
            },
            {
              value: "侵袭性NK细胞白血病",
              label: "侵袭性NK细胞白血病"
            },
            {
              value: "儿童系统性EBV阳性T细胞淋巴瘤",
              label: "儿童系统性EBV阳性T细胞淋巴瘤"
            },
            {
              value: "慢性活动性EBV感染（T细胞和NK细胞型），系统性",
              label: "慢性活动性EBV感染（T细胞和NK细胞型），系统性"
            },
            {
              value: "种痘水疱病样淋巴组织增殖性疾病",
              label: "种痘水疱病样淋巴组织增殖性疾病"
            },
            {
              value: "严重蚊虫叮咬过敏症",
              label: "严重蚊虫叮咬过敏症"
            },
            {
              value: "成人T细胞白血病/淋巴瘤",
              label: "成人T细胞白血病/淋巴瘤"
            },
            {
              value: "结外NK/T细胞淋巴瘤，鼻型",
              label: "结外NK/T细胞淋巴瘤，鼻型"
            },
            {
              value: "肠病相关T细胞淋巴瘤",
              label: "肠病相关T细胞淋巴瘤"
            },
            {
              value: "单形性嗜上皮性肠道T细胞淋巴瘤",
              label: "单形性嗜上皮性肠道T细胞淋巴瘤"
            },
            {
              value: "肠道T细胞淋巴瘤，非特指型",
              label: "肠道T细胞淋巴瘤，非特指型"
            },
            {
              value: "胃肠道惰性T细胞增殖性疾病",
              label: "胃肠道惰性T细胞增殖性疾病"
            },
            {
              value: "肝脾T细胞淋巴瘤",
              label: "肝脾T细胞淋巴瘤"
            },
            {
              value: "皮下脂膜炎样T细胞淋巴瘤",
              label: "皮下脂膜炎样T细胞淋巴瘤"
            },
            {
              value: "蕈样肉芽肿",
              label: "蕈样肉芽肿"
            },
            {
              value: "Sezary综合征",
              label: "Sezary综合征"
            },
            {
              value: "淋巴瘤样丘疹病",
              label: "淋巴瘤样丘疹病"
            },
            {
              value: "原发性皮肤间变性大细胞淋巴瘤",
              label: "原发性皮肤间变性大细胞淋巴瘤"
            },
            {
              value: "原发性皮肤γδT细胞淋巴瘤",
              label: "原发性皮肤γδT细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤",
              label: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤肢端CD8阳性T细胞淋巴瘤",
              label: "原发性皮肤肢端CD8阳性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病",
              label: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病"
            },
            {
              value: "外周T细胞淋巴瘤，非特指型",
              label: "外周T细胞淋巴瘤，非特指型"
            },
            {
              value: "血管免疫母细胞T细胞淋巴瘤",
              label: "血管免疫母细胞T细胞淋巴瘤"
            },
            {
              value: "滤泡T细胞淋巴瘤",
              label: "滤泡T细胞淋巴瘤"
            },
            {
              value: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤",
              label: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阳性",
              label: "间变性大细胞淋巴瘤，ALK阳性"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阴性",
              label: "间变性大细胞淋巴瘤，ALK阴性"
            },
            {
              value: "乳房植入物相关的间变性大细胞淋巴瘤",
              label: "乳房植入物相关的间变性大细胞淋巴瘤"
            },
            {
              value: "其他T细胞淋巴瘤",
              label: "其他T细胞淋巴瘤"
            }
          ]
        },
        {
          value: "前驱淋巴性肿瘤",
          label: "前驱淋巴性肿瘤",
          children: [
            {
              value: "B淋巴母细胞白血病/淋巴瘤，非特殊类型",
              label: "B淋巴母细胞白血病/淋巴瘤，非特殊类型"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排",
              label: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴超二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴超二倍体"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴低二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴低二倍体"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样",
              label: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴iAMP21",
              label: "B淋巴母细胞白血病/淋巴瘤伴iAMP21"
            },
            {
              value: "T淋巴母细胞白血病/淋巴瘤",
              label: "T淋巴母细胞白血病/淋巴瘤"
            },
            {
              value: "早期T前驱淋巴母细胞白血病",
              label: "早期T前驱淋巴母细胞白血病"
            },
            {
              value: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤",
              label: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤"
            }
          ]
        },
        {
          value: "成熟B细胞淋巴瘤",
          label: "成熟B细胞淋巴瘤",
          children: [
            {
              value: "B细胞淋巴瘤（亚型无法确定）",
              label: "B细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）",
              label: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）"
            },
            {
              value: "单克隆B淋巴细胞增多症（MBL）",
              label: "单克隆B淋巴细胞增多症（MBL）"
            },
            {
              value: "B幼淋巴细胞白血病",
              label: "B幼淋巴细胞白血病"
            },
            {
              value: "脾边缘区细胞淋巴瘤",
              label: "脾边缘区细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病",
              label: "毛细胞白血病"
            },
            {
              value: "脾B细胞淋巴瘤/白血病，不能分类",
              label: "脾B细胞淋巴瘤/白血病，不能分类"
            },
            {
              value: "脾弥漫性红髓小B细胞淋巴瘤",
              label: "脾弥漫性红髓小B细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病变异型",
              label: "毛细胞白血病变异型"
            },
            {
              value: "淋巴浆细胞淋巴瘤",
              label: "淋巴浆细胞淋巴瘤"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型"
            },
            {
              value: "Mu重链病",
              label: "Mu重链病"
            },
            {
              value: "Gamma重链病",
              label: "Gamma重链病"
            },
            {
              value: "Alpha重链病",
              label: "Alpha重链病"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型"
            },
            {
              value: "浆细胞骨髓瘤",
              label: "浆细胞骨髓瘤"
            },
            {
              value: "骨孤立性浆细胞瘤",
              label: "骨孤立性浆细胞瘤"
            },
            {
              value: "骨外浆细胞瘤",
              label: "骨外浆细胞瘤"
            },
            {
              value: "单克隆免疫球蛋白沉积病",
              label: "单克隆免疫球蛋白沉积病"
            },
            {
              value: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）",
              label: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）"
            },
            {
              value: "结内边缘区淋巴瘤",
              label: "结内边缘区淋巴瘤"
            },
            {
              value: "滤泡性淋巴瘤",
              label: "滤泡性淋巴瘤"
            },
            {
              value: "儿童型滤泡性淋巴瘤",
              label: "儿童型滤泡性淋巴瘤"
            },
            {
              value: "伴IRF4重排大B细胞淋巴瘤",
              label: "伴IRF4重排大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤滤泡中心细胞淋巴瘤",
              label: "原发皮肤滤泡中心细胞淋巴瘤"
            },
            {
              value: "套细胞淋巴瘤",
              label: "套细胞淋巴瘤"
            },
            {
              value: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型",
              label: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型"
            },
            {
              value: "富于T细胞/组织细胞大B细胞淋巴瘤",
              label: "富于T细胞/组织细胞大B细胞淋巴瘤"
            },
            {
              value: "原发中枢神经系统弥漫性大B细胞淋巴瘤",
              label: "原发中枢神经系统弥漫性大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤弥漫性大B细胞淋巴瘤，腿型",
              label: "原发皮肤弥漫性大B细胞淋巴瘤，腿型"
            },
            {
              value: "EBV+弥漫性大B细胞淋巴瘤，非特指型",
              label: "EBV+弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "EBV+黏膜皮肤溃疡",
              label: "EBV+黏膜皮肤溃疡"
            },
            {
              value: "慢性炎症相关弥漫性大B细胞淋巴瘤",
              label: "慢性炎症相关弥漫性大B细胞淋巴瘤"
            },
            {
              value: "淋巴瘤样肉芽肿",
              label: "淋巴瘤样肉芽肿"
            },
            {
              value: "原发性纵隔（胸腺）大B细胞淋巴瘤",
              label: "原发性纵隔（胸腺）大B细胞淋巴瘤"
            },
            {
              value: "血管内大B细胞淋巴瘤",
              label: "血管内大B细胞淋巴瘤"
            },
            {
              value: "ALK阳性大B细胞淋巴瘤",
              label: "ALK阳性大B细胞淋巴瘤"
            },
            {
              value: "浆母细胞性淋巴瘤",
              label: "浆母细胞性淋巴瘤"
            },
            {
              value: "原发渗出性淋巴瘤",
              label: "原发渗出性淋巴瘤"
            },
            {
              value: "多中心Castleman病",
              label: "多中心Castleman病"
            },
            {
              value: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型",
              label: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "HHV8阳性亲生发中心淋巴组织增殖性疾病",
              label: "HHV8阳性亲生发中心淋巴组织增殖性疾病"
            },
            {
              value: "Burkitt淋巴瘤",
              label: "Burkitt淋巴瘤"
            },
            {
              value: "伴11q异常的Burkitt样淋巴瘤",
              label: "伴11q异常的Burkitt样淋巴瘤"
            },
            {
              value: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排",
              label: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排"
            },
            {
              value: "高级别B细胞淋巴瘤，非特指型",
              label: "高级别B细胞淋巴瘤，非特指型"
            },
            {
              value: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤",
              label: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤"
            },
            {
              value: "其他B细胞淋巴瘤",
              label: "其他B细胞淋巴瘤"
            }
          ]
        },
        {
          value: "霍奇金淋巴瘤",
          label: "霍奇金淋巴瘤",
          children: [
            {
              value: "霍奇金淋巴瘤（亚型无法确定）",
              label: "霍奇金淋巴瘤（亚型无法确定）"
            },
            {
              value: "结节性淋巴细胞为主型霍奇金淋巴瘤",
              label: "结节性淋巴细胞为主型霍奇金淋巴瘤"
            },
            {
              value: "经典型霍奇金淋巴瘤",
              label: "经典型霍奇金淋巴瘤"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" ></style>
