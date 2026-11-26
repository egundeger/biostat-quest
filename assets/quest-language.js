const caseCorrections = {
  anova1: {
    explanation: ["Düzeltmesiz ikili testler, hipotez ailesinde en az bir yanlış pozitif bulma olasılığını artırır. Tek yönlü ANOVA önce grup ortalamalarının eşitliğini birlikte sınar.", "Unadjusted pairwise tests increase the chance of at least one false positive across the family. A one-way ANOVA first tests equality of the group means jointly."],
    hint: ["Her test için seçilen α ile test ailesinin toplam hata olasılığını ayırın.", "Distinguish the chosen alpha for each test from the error probability across the family."],
  },
  anova2: {
    options: [["Üç grup ortalaması da birbirinden farklıdır.", "All three group means differ."], ["Tüm grup ortalamalarının eşit olduğu hipotezi reddedilir.", "Reject the hypothesis that all group means are equal."], ["Birinci diyet en iyi sonucu verir.", "Diet 1 gives the best outcome."], ["Grup ortalamaları arasında fark için kanıt yoktur.", "There is no evidence of a difference in group means."]],
    explanation: ["Genel F testi hangi çiftlerin farklı olduğunu belirlemez. Belirli çiftleri değerlendirmek için uygun çoklu karşılaştırmalar kullanılır.", "The overall F test does not identify which pairs differ. Use appropriate multiple comparisons to evaluate specific pairs."],
  },
  anova4: {
    story: ["Tek yönlü ANOVA’da gruplar arası kareler toplamı 120, grup içi kareler toplamı 280’dir.", "In a one-way ANOVA, the between-groups sum of squares is 120 and the within-groups sum of squares is 280."],
    options: [["η² = 0,30. Toplam değişkenliğin %30’u grup farklarıyla ilişkilidir.", "η² = 0.30. Group differences account for 30% of total variation."], ["η² = 0,43. Toplam değişkenliğin %43’ü açıklanır.", "η² = 0.43. The model explains 43% of total variation."], ["η² = 0,30. Toplam değişkenliğin %70’i açıklanır.", "η² = 0.30. The model explains 70% of total variation."], ["η² = 120/280 = 0,43.", "η² = 120/280 = 0.43."]],
    explanation: ["η² = 120/(120 + 280) = 0,30. Etkinin uygulamadaki önemini ölçüm ve çalışma bağlamıyla değerlendirin.", "η² = 120/(120 + 280) = 0.30. Interpret its practical importance in the measurement and study context."],
  },
  chi3: {
    question: ["Bu 2 × 2 tablo için hangi yöntem daha uygundur?", "Which method is preferable for this 2 × 2 table?"],
    options: [["Beklenen sayılara bakmadan Pearson ki-kare testi", "Pearson’s chi-square test regardless of the expected counts"], ["Fisher’ın kesin testi", "Fisher’s exact test"], ["Toplam n 30’dan büyükse her durumda Pearson ki-kare testi", "Pearson’s chi-square test whenever total n exceeds 30"], ["Kategorileri gerekçe göstermeden birleştirmek", "Merge categories without justification"]],
    explanation: ["Küçük beklenen hücre sayılarında ki-kare yaklaşımı güvenilirliğini kaybedebilir. Bu 2 × 2 örneğinde Fisher’ın kesin testi uygundur.", "With small expected cell counts the chi-square approximation can become unreliable. Fisher’s exact test is appropriate for this 2 × 2 example."],
  },
  corr2: {
    title: ["Korelasyon ve nedensellik", "Correlation and causation"],
    options: [["Güçlü korelasyon doğrudan nedenselliği gösterir.", "Strong correlation establishes direct causation."], ["Bu korelasyondan nedensellik çıkarılamaz. Hava sıcaklığı olası bir karıştırıcıdır.", "Correlation alone cannot establish causation. Temperature is a plausible confounder."], ["İlişkinin yönü, hangi değişkenin neden olduğunu gösterir.", "The sign tells us which variable is causal."], ["Korelasyon karıştırıcıları zaten hesaba katar.", "Correlation already adjusts for confounding."]],
    explanation: ["Yaz sıcaklığı hem dondurma tüketimiyle hem de yüzme sıklığıyla ilişkili olabilir. Gözlenen korelasyon tek başına bu açıklamayı da kanıtlamaz.", "Warm weather may be related to both ice cream consumption and swimming frequency. The correlation alone does not establish that explanation either."],
  },
  cpk1: {
    question: ["Cpk kaçtır? Bu eğitim örneğindeki 1,33 hedefini karşılıyor mu?", "What is Cpk? Does it meet the teaching target of 1.33?"],
    options: [["Cpk = 1,00. Hedefin altında.", "Cpk = 1.00. Below target."], ["Cpk = 1,67. Hedefin üstünde.", "Cpk = 1.67. Above target."], ["Cpk = 2,33. Hedefin üstünde.", "Cpk = 2.33. Above target."], ["Cpk = 0,67. Hedefin altında.", "Cpk = 0.67. Below target."]],
    explanation: ["Üst sınıra uzaklık (525 − 510)/(3 × 5) = 1,00. Alt sınıra uzaklık (510 − 475)/(3 × 5) ≈ 2,33. Cpk bu iki değerin küçüğüdür.", "The scaled upper distance is (525 − 510)/(3 × 5) = 1.00. The scaled lower distance is (510 − 475)/(3 × 5) ≈ 2.33. Cpk is the smaller value."],
  },
  cpk3: {
    title: ["Spesifikasyon dışında beklenen oran", "Expected fraction outside specifications"],
    story: ["Kararlı ve normal dağılan bir proses iki spesifikasyon sınırının tam ortasındadır. Cpk = 1,33.", "A stable, normally distributed process is exactly centered between its specification limits. Cpk = 1.33."],
    question: ["Her bir milyon birimin yaklaşık kaçı spesifikasyon sınırlarının dışında kalır?", "Approximately how many units per million (ppm) are expected outside the two limits?"],
    options: [["Yaklaşık 66 ppm", "About 66 ppm"], ["Yaklaşık 2.700 ppm", "About 2,700 ppm"], ["Yaklaşık 6.210 ppm", "About 6,210 ppm"], ["Yaklaşık 3,4 ppm", "About 3.4 ppm"]],
    explanation: ["Her sınır ortalamaya 3 × 1,33 = 3,99 standart sapma uzaklıktadır. Normal dağılımın iki kuyruğu toplam yaklaşık 66 ppm verir. Bu sayı merkezleme ve dağılım varsayımlarına bağlıdır.", "Each limit lies 3 × 1.33 = 3.99 standard deviations from the mean. The two normal tails total about 66 ppm under those centering and distribution assumptions."],
  },
  desc4: {
    story: ["İlaç çözünme süreleri (dakika) 12, 15, 18, 19, 20, 21, 22, 25 ve 45. R’nin varsayılan tip 7 çeyreklik yöntemi kullanılacaktır.", "Drug dissolution times in minutes are 12, 15, 18, 19, 20, 21, 22, 25 and 45. Use R’s default type 7 quantile method."],
    options: [["IQR = 4 (Q₁ = 18, Q₃ = 22)", "IQR = 4 (Q₁ = 18, Q₃ = 22)"], ["IQR = 33 (45 − 12)", "IQR = 33 (45 − 12)"], ["IQR = 20 (medyan)", "IQR = 20 (median)"], ["IQR = 10 (Q₁ = 15, Q₃ = 25)", "IQR = 10 (Q₁ = 15, Q₃ = 25)"]],
    explanation: ["Tip 7 ile üçüncü sıralı ölçüm Q₁ = 18, yedinci ölçüm Q₃ = 22’dir. Çeyrekler arası açıklık 22 − 18 = 4 dakikadır.", "With type 7, the third sorted observation gives Q₁ = 18 and the seventh gives Q₃ = 22. The interquartile range is 22 − 18 = 4 minutes."],
    hint: ["Çeyrekler arası açıklık Q₃ − Q₁ olarak hesaplanır.", "Calculate the interquartile range as Q₃ − Q₁."],
  },
  desc5: {
    question: ["Bu iki özet hangi dağılım özelliğiyle uyumludur?", "Which distribution feature is consistent with these summaries?"],
    explanation: ["Büyük değerlerin ortalamayı yukarı çekmesi sağa çarpıklıkla uyumludur. Çarpıklığı doğrulamak için dağılım grafiğine de bakın.", "High values pulling the mean upward are consistent with right skew. Inspect a distribution plot to assess the shape."],
  },
  nonp2: {
    story: ["Aynı hastalarda önce ve sonra ağrı puanları ölçülüyor. Eşleştirilmiş farklar yaklaşık simetrik, ancak normal değil.", "Pain scores are measured before and after in the same participants. The paired differences are approximately symmetric but not normal."],
    question: ["Eşleştirilmiş farkları işaret ve büyüklük sıralarıyla hangi test değerlendirir?", "Which test assesses paired differences using their signs and magnitude ranks?"],
    explanation: ["Wilcoxon işaretli sıralar testi eşleştirilmiş farkları kullanır. Konum farkı yorumu için farkların yaklaşık simetrik olması önemlidir.", "The Wilcoxon signed-rank test uses paired differences. Approximate symmetry matters when interpreting it as a location comparison."],
  },
  norm1: {
    options: [["Normallik hipotezi reddedilir.", "Reject the normality hypothesis."], ["Normallik hipotezi reddedilemez.", "Do not reject the normality hypothesis."], ["Test örneklem büyüklüğünü doğrudan verir.", "The test directly gives a required sample size."], ["Test varyansların eşitliğini sınar.", "The test assesses equal variances."]],
    explanation: ["p = 0,42 > 0,05. Bu testte normallikten sapma için yeterli kanıt elde edilmedi. Q–Q grafiği ve örneklem büyüklüğü de değerlendirilir.", "p = 0.42 > 0.05. This test did not provide sufficient evidence against normality. Assess the Q–Q plot and sample size as well."],
  },
  norm2: {
    story: ["İki küçük bağımsız grupta sıralı puanlar karşılaştırılıyor. Araştırma sorusu puanların sıralarına dayalı bir karşılaştırma gerektiriyor.", "Two small independent groups have ordinal scores. The research question calls for a comparison based on ranks."],
    data: [{ "Grup": 2, "Ölçüm": "Sıralı puan" }, { Groups: 2, Outcome: "Ordinal score" }],
    question: ["Hangi yöntem bu tasarıma uygundur?", "Which method fits this design?"],
    options: [["Eşleştirilmiş t-testi", "Paired t-test"], ["Mann–Whitney U testi", "Mann–Whitney U test"], ["Friedman testi", "Friedman test"], ["McNemar testi", "McNemar test"]],
    explanation: ["Mann–Whitney U, bağımsız iki grubun sıralı verilerini karşılaştırır. Test seçimi ölçüm ölçeğine, tasarıma ve araştırma sorusuna dayanır.", "Mann–Whitney U compares ranks from two independent groups. Test choice follows the measurement scale, design and research question."],
    hint: ["Gruplar bağımsız ve veri sıralıdır.", "The groups are independent and the outcome is ordinal."],
  },
  norm3: {
    explanation: ["n = 5 olduğunda normallik testinin sapmaları saptama gücü düşük olabilir. p = 0,85, normallik hipotezini reddetmek için yeterli kanıt vermiyor.", "At n = 5 a normality test can have low power to detect departures. p = 0.85 gives insufficient evidence to reject normality."],
  },
  norm4: {
    explanation: ["Q–Q grafiği genel olarak doğrusal görünüyor ve Shapiro–Wilk testi belirgin sapma göstermiyor. Normal yaklaşımın uygunluğunu örneklem büyüklüğü ve analiz amacıyla birlikte değerlendirin.", "The Q–Q plot is approximately linear and Shapiro–Wilk does not show strong evidence of departure. Assess suitability for the analysis and sample size."],
  },
  norm5: {
    story: ["İki bağımsız grubun her birinde 150 gözlem var. Varyanslar sonlu ve birkaç uç gözlem sonuçları belirlemiyor. Shapiro–Wilk testi p = 0,01 veriyor.", "Each of two independent groups has 150 observations. The variances are finite and a few extremes do not dominate. Shapiro–Wilk gives p = 0.01."],
    data: [{ "Grup başına n": 150, "Shapiro–Wilk p": 0.01 }, { "n per group": 150, "Shapiro–Wilk p": 0.01 }],
    options: [["Her zaman sıra testi şarttır.", "A rank test is always required."], ["Ortalamaların karşılaştırılması için Welch t-testi makul olabilir.", "Welch’s t-test can be reasonable for comparing means."], ["Yalnızca grupların varyansları tam eşitse t-testi yapılır.", "A t-test requires exactly equal group variances."], ["Önce normal dağılım üreten bir dönüşüm zorunludur.", "A transformation to normality is required first."]],
    explanation: ["Bağımsızlık ve sonlu varyans gibi koşullarda merkezi limit teoremi örneklem ortalamasının dağılımını açıklar. Büyük gruplarda, ortalamayı hedefleyen Welch testi bu bağlamda uygun olabilir.", "Under conditions such as independence and finite variance the central limit theorem describes the sampling distribution of the mean. For these large groups a Welch comparison of means can be appropriate."],
  },
  paired1: {
    story: ["Beş hastanın her birinde ilaç öncesi ve sonrası kan basıncı ölçüldü. Analiz, kişi içi ortalama değişimi değerlendirecek.", "Blood pressure was measured before and after treatment in each of five patients. The analysis will assess the mean within-person change."],
  },
  paired2: {
    options: [["H₀: Önceki ve sonraki ortalamaların toplamı sıfırdır.", "H₀: The sum of the before and after means is zero."], ["H₀: μ_fark = 0", "H₀: μ_difference = 0"], ["H₀: σ_önce = σ_sonra", "H₀: σ_before = σ_after"], ["H₀: Önceki ortalama, sonraki ortalamadan büyüktür.", "H₀: The before mean exceeds the after mean."]],
    explanation: ["Eşleştirilmiş t-testi, kişi içi farklara uygulanan tek örneklem t-testidir. Sıfır hipotezi, popülasyon ortalama farkının sıfır olmasıdır.", "The paired t-test is a one-sample t-test on the within-person differences. Its null hypothesis is a population mean difference of zero."],
  },
  paired4: {
    options: [["Katılımcı sayısını artırır.", "It increases the number of participants."], ["Ölçümler pozitif ilişkiliyse farkların değişkenliğini azaltabilir.", "It can reduce variability of differences when paired measurements are positively correlated."], ["Varyansları eşit varsayar.", "It assumes equal variances."], ["Her durumda serbestlik derecesini artırır.", "It always increases the degrees of freedom."]],
    explanation: ["Kişi içi fark alma, ortak başlangıç farklılıklarını ayırabilir. Pozitif eşleşme korelasyonu farkların varyansını azaltabilir. Kazanç, eşleşmenin gücüne bağlıdır.", "Taking within-person differences can account for shared baseline variation. Positive within-pair correlation can reduce variance of the differences. The gain depends on the strength of pairing."],
  },
  posthoc1: {
    title: ["ANOVA sonrası ikili karşılaştırmalar", "Pairwise comparisons after ANOVA"],
    question: ["Amaç hangi tedavi çiftlerinin farklı olduğunu belirlemekse sonraki adım nedir?", "If the goal is to identify which pairs of treatments differ, what is the next step?"],
    options: [["Tüm grupların birbirinden farklı olduğu sonucuna varmak.", "Conclude that all groups differ from one another."], ["Çokluk düzeltmeli ikili karşılaştırmalar yapmak.", "Use pairwise comparisons with multiplicity adjustment."], ["Aynı ANOVA’yı tekrarlamak.", "Repeat the same ANOVA."], ["F istatistiğini doğrudan her grup çiftine uygulamak.", "Apply the overall F statistic directly to each pair." ]],
    explanation: ["Genel ANOVA testi, hangi ortalamaların farklı olduğunu belirlemez. İncelenecek karşılaştırma ailesine göre Tukey veya uygun bir çokluk düzeltmesi seçilir.", "The overall ANOVA does not identify which means differ. Choose Tukey’s procedure or another appropriate multiplicity adjustment for the comparisons of interest."],
  },
  posthoc2: {
    explanation: ["Tukey HSD, ANOVA varsayımları altında bütün ikili ortalama karşılaştırmalarını birlikte ele almak için tasarlanmıştır. Yalnızca kontrol grubuna karşı karşılaştırmalarda Dunnett yöntemi uygun olabilir.", "Tukey HSD is designed for simultaneous comparison of all pairs of means under ANOVA assumptions. Dunnett’s method may suit comparisons against a control only."],
  },
  pow2: {
    title: ["Tip I ve Tip II hata", "Type I and Type II errors"],
    options: [["Belirlenen etki altında H₀’ı reddetme olasılığı %80’dir.", "The probability of rejecting H₀ under the specified effect is 80%."], ["Yanlış pozitif sonuç almama olasılığı %80’dir.", "The probability of avoiding a false positive is 80%."], ["Hedef örneklemin %80’i yeterlidir.", "80% of the planned sample is sufficient."], ["Testin p değeri 0,80’dir.", "The test will produce a p-value of 0.80."]],
    explanation: ["Güç, belirlenen etki büyüklüğü ve çalışma varsayımları altında H₀’ı reddetme olasılığıdır. Bu alternatif için %80 güç, %20 Tip II hata olasılığına karşılık gelir.", "Power is the probability of rejecting H₀ under the specified effect and study assumptions. For that alternative, 80% power corresponds to 20% probability of a Type II error."],
  },
  reg3: {
    title: ["Kalibrasyon için R² yeterli mi?", "Is R² enough for calibration?"],
    story: ["HPLC kalibrasyonunda konsantrasyon ve pik alanı modelleniyor. R² = 0,9985.", "An HPLC calibration models concentration and peak area. R² = 0.9985."],
    question: ["Yöntemin amaca uygunluğu için hangi değerlendirme gerekir?", "What is needed to assess fitness for the intended use?"],
    options: [["Artıkları, çalışma aralığını ve bağımsız kontrol numunelerini değerlendirmek.", "Assess residuals, working range and independent control samples."], ["R² 0,99’u geçtiği için doğrudan kabul etmek.", "Accept automatically because R² exceeds 0.99."], ["Yalnızca eğimin p değerine bakmak.", "Check only the p-value of the slope."], ["R²’nin tam olarak 1 olmasını beklemek.", "Require an R² of exactly 1."]],
    explanation: ["Yüksek R², artıklardaki eğriliği veya konsantrasyona göre değişen hatayı gizleyebilir. Modeli çalışma aralığı ve amaca uygun performans göstergeleriyle değerlendirin.", "High R² can hide curvature or concentration-dependent error. Evaluate the working range and performance appropriate to the intended use."],
    hint: ["Uyumun yapısı için artıkların dağılımına bakın.", "Inspect residuals to understand the fit."],
  },
  rm2: {
    explanation: ["Küresellikten sapma, düzeltilmemiş F testinin Tip I hata oranını artırabilir. Greenhouse–Geisser veya Huynh–Feldt, serbestlik derecelerini tahmini ε ile ayarlar.", "Departure from sphericity can inflate the Type I error rate of the unadjusted F test. Greenhouse–Geisser or Huynh–Feldt adjusts the degrees of freedom using estimated epsilon."],
  },
  tost1: {
    story: ["İki analitik yöntem için kabul edilebilir ortalama fark aralığı çalışma öncesinde belirlendi.", "An acceptable range of mean differences between two analytical methods was specified before the study."],
    data: [{ "Amaç": "Analitik yöntem eşdeğerliği" }, { Goal: "Analytical method equivalence" }],
    explanation: ["Standart fark testinde H₀’ın reddedilememesi eşdeğerlik için yeterli kanıt vermez. TOST, farkın önceden belirlenen iki sınırın içinde olup olmadığını değerlendirir.", "Failing to reject the usual null hypothesis of no difference is insufficient evidence of equivalence. TOST evaluates whether the difference lies within two prespecified margins."],
  },
  tost2: {
    title: ["Ortalama biyoeşdeğerlik ölçütü (ABE)", "Average bioequivalence criterion (ABE)"],
    story: ["ICH M13A’nın standart kapsamındaki bir eğitim örneğinde tek bir farmakokinetik parametre için test/karşılaştırıcı geometrik ortalama oranı inceleniyor.", "In a teaching example under the standard ICH M13A setting, consider the test/comparator geometric mean ratio for one pharmacokinetic parameter."],
    question: ["%90 güven aralığı 0,85–1,15’tir. Bu parametrenin aralığı 0,80–1,25 sınırları içinde mi?", "The 90% confidence interval is 0.85–1.15. Is this endpoint within the limits of 0.80–1.25?"],
    options: [["Hayır, alt uç sınırın dışındadır.", "No, its lower end is outside."], ["Evet, aralığın tamamı sınırlar içindedir.", "Yes, the whole interval is within the limits."], ["Değerlendirme için yalnızca %95 güven aralığı kullanılabilir.", "Only a 95% confidence interval can be used."], ["Bunun için tek koşul p < 0,05’tir.", "The sole condition is p < 0.05."]],
    explanation: ["0,85–1,15 aralığı verilen sınırlar içindedir. Bu bir parametreye ait değerlendirmedir. Uygulanabilir tüm parametreler ayrıca değerlendirilir.", "The interval 0.85–1.15 lies inside the stated limits. This is an endpoint-level assessment. Evaluate every applicable parameter."],
  },
  tost3: {
    title: ["Aşağı olmama ve eşdeğerlik", "Non-inferiority and equivalence"],
    question: ["Önceden belirlenmiş bir marjla standart tedaviden kabul edilemeyecek kadar düşük etkiyi dışlamak için hangi yaklaşım kullanılır?", "Which approach rules out an unacceptably lower effect than standard treatment using a prespecified margin?"],
    options: [["Eşdeğerlik (iki sınır)", "Equivalence (two margins)"], ["Aşağı olmama (non-inferiority, tek marj)", "Non-inferiority (one margin)"], ["Üstünlük testi", "Superiority test"], ["Sıfır farkı sınayan standart t-testi", "Standard t-test for zero difference"]],
    explanation: ["Daha büyük değerler yararlıysa aşağı olmama, yeni tedavinin etki farkı için alt güven sınırını −marj ile karşılaştırır. Eşdeğerlik, iki sınır arasında kalma sorusunu yanıtlar.", "For an outcome where higher is better, non-inferiority compares the lower confidence bound on the treatment difference with the negative margin. Equivalence asks whether the effect lies between two bounds."],
  },
  ttest1: {
    question: ["t ≈ 3,72 ve p < 0,001 bulundu. α = 0,05 düzeyinde sonuç nedir?", "The result is t ≈ 3.72 and p < 0.001. What is the conclusion at α = 0.05?"],
    explanation: ["p, anlamlılık düzeyinden küçüktür. Grup ortalamalarının eşitliği hipotezi reddedilir. Gözlenen ortalama tedavi grubunda daha yüksektir.", "The p-value is below alpha. Reject the hypothesis of equal group means. The observed mean is higher in the treatment group."],
  },
  ttest3: {
    options: [["Etki mutlaka büyük ve önemlidir.", "The effect is necessarily large and important."], ["İstatistiksel sonuç anlamlıdır. Standartlaştırılmış fark küçüktür.", "The result is statistically significant. The standardized difference is small."], ["p = 0,03, α = 0,05 düzeyinde anlamlı değildir.", "p = 0.03 is not significant at α = 0.05."], ["d = 0,15, sonuçların %15’ini açıklar.", "d = 0.15 explains 15% of the outcomes."]],
    explanation: ["d = 0,15 standart sapma biriminde küçük bir farktır. Uygulamadaki önem, kabul edilebilir fark ve güven aralığı gibi çalışma bilgileriyle değerlendirilir.", "d = 0.15 is a small difference in standard deviation units. Practical importance depends on context, meaningful differences and uncertainty."],
  },
  ttest4: {
    title: ["Tek ve iki taraflı testler", "One- and two-sided tests"],
    story: ["Çalışma başlamadan önce yeni tedavinin daha etkili olacağı yönü ve tek taraflı test belirlendi. İki taraflı p = 0,08, beklenen yöndeki tek taraflı p = 0,04.", "Before the study, the direction of benefit and a one-sided test were prespecified. The two-sided p-value is 0.08 and the one-sided p-value in the expected direction is 0.04."],
    explanation: ["Önceden belirlenen tek taraflı testte p = 0,04 < 0,05. Yön ve test türü sonuçları gördükten sonra seçilmez.", "The prespecified one-sided analysis gives p = 0.04 < 0.05. Choose the test direction and sidedness before seeing the results."],
  },
  twoway3: {
    explanation: ["Örnekte paralel çizgiler, gözlenen doz etkisinin iki ilaç için benzer olduğunu gösterir. Etkileşim hakkında çıkarım için model tahmini ve belirsizliği değerlendirin.", "Parallel lines suggest similar observed dose effects for the two drugs. Use the model estimate and uncertainty for inference about the interaction."],
  },
  var1: {
    explanation: ["Levene testi, grup varyanslarının eşitliğini sınar. Ortalama karşılaştırmasında eşit varyansa dayanmak için ayrıca bilimsel ve tasarıma dayalı gerekçe gerekir.", "Levene’s test assesses equality of group variances. Using a common variance to compare means also requires a rationale based on study design and context."],
    hint: ["Levene testi grup varyanslarını karşılaştırır.", "Levene’s test compares group variances."],
  },
  var2: {
    question: ["α = 0,05 düzeyinde Levene testi ne gösterir?", "What does Levene’s test show at α = 0.05?"],
    options: [["Eşit varyans hipotezi reddedilir.", "Reject the equal-variance hypothesis."], ["Eşit varyans hipotezi reddedilemez.", "Do not reject the equal-variance hypothesis."], ["Varyanslar kesinlikle eşittir.", "The variances are known to be equal."], ["Grup ortalamaları arasında fark vardır.", "The group means are different."]],
    explanation: ["p = 0,37, varyansların farklı olduğu sonucunu desteklemez. Varyans modelini yalnızca bu ön testten seçmeyin. Welch t-testi eşit varyans varsayımı gerektirmez.", "p = 0.37 does not provide evidence of unequal variances. Do not choose the variance model based solely on this preliminary test. Welch’s t-test does not assume equality."],
  },
  var3: {
    options: [["F = büyük varyans / küçük varyans = 4,8²/2,5² ≈ 3,69", "F = larger variance / smaller variance = 4.8²/2.5² ≈ 3.69"], ["F = SS_A / SS_B ≈ 0,52", "F = SD_A / SD_B ≈ 0.52"], ["F = ortalama farkı / standart hata", "F = mean difference / standard error"], ["F = n_A / n_B = 1,00", "F = n_A / n_B = 1.00"]],
    explanation: ["Varyans oranı 23,04/6,25 ≈ 3,69’dur. Klasik F testi için iki grubun normal dağılım varsayımını ve her varyansın serbestlik derecesini (24) dikkate alın.", "The variance ratio is 23.04/6.25 ≈ 3.69. The classical F test relies on normality in both groups and uses 24 degrees of freedom for each sample variance."],
  },
};

const turkishPairs = [
  [/Non[- ]Parametrik/gi, "Parametrik olmayan"],
  [/non[- ]normalliği/gi, "normallikten sapmayı"],
  [/non[- ]normallik/gi, "normallikten sapma"],
  [/Tekrarlanan Ölçümler ANOVA/g, "Tekrarlı ölçümler ANOVA’sı"],
  [/Tekrarlanan Ölçümler/g, "Tekrarlı ölçümler"],
  [/Tek Yönlü/g, "Tek yönlü"], [/İki Yönlü/g, "İki yönlü"],
  [/Ki-Kare/g, "Ki-kare"], [/Etki Büyüklüğü/g, "Etki büyüklüğü"],
  [/bağımsız t-testin\b/gi, "bağımsız t-testinin"],
  [/t-testlerle\b/gi, "t-testleriyle"], [/t-testler\b/gi, "t-testleri"],
  [/t-test\b/gi, "t-testi"], [/t-Testi/g, "t-testi"],
  [/Post-Hoc Ne Zaman Kullanılır\??/g, "Çoklu karşılaştırmalar ne zaman yapılır?"],
  [/Post-Hoc Testler/g, "Çoklu karşılaştırmalar"], [/post-hoc testler/g, "çoklu karşılaştırmalar"],
  [/Post-Hoc/g, "Çoklu karşılaştırma"], [/post-hoc/g, "çoklu karşılaştırma"],
  [/\bvs\.?\s+(?=[\p{L}(])/gu, "ile "],
  [/Tek Kuyruk/g, "Tek taraflı test"], [/Çift Kuyruk/g, "İki taraflı test"],
  [/tek kuyruklu/g, "tek taraflı"], [/çift kuyruklu/g, "iki taraflı"],
  [/tek kuyruk/g, "tek taraflı"], [/çift kuyruk/g, "iki taraflı"],
  [/standardtan/g, "standarttan"], [/metod([a-z]*)/gi, (_, ending) => "yöntem" + ending],
  [/Cohen's d/g, "Cohen’in d katsayısı"], [/Kendall's tau/g, "Kendall τ"], [/Cochran's Q/g, "Cochran Q"],
  [/Greenhouse-Geisser/g, "Greenhouse–Geisser"], [/Huynh-Feldt/g, "Huynh–Feldt"],
  [/Shapiro-Wilk/g, "Shapiro–Wilk"], [/Mann-Whitney/g, "Mann–Whitney"],
  [/Kruskal-Wallis/g, "Kruskal–Wallis"], [/Welch-Satterthwaite/g, "Welch–Satterthwaite"],
  [/\bp-değeri/g, "p değeri"], [/\bCV%/g, "CV (%)"],
];

function decimalCommas(value) {
  return value.replace(/\b\d{1,3}\.\d+\b/g, (match, index) => {
    const before = value.slice(0, index);
    const after = value.slice(index + match.length);
    if (/(?:Modül|Bölüm|ICH)\s*$/i.test(before) || /\.\w/.test(after.slice(0, 2)) || /\.\d$/.test(before) ||
        (/^[1-9]\d*\.\d{3}$/.test(match) && /^\s*(?:ppm|kişi)\b/.test(after))) return match;
    return match.replace(".", ",");
  }).replace(/(?<![\p{L}\d%])(\d+(?:,\d+)?)%/gu, "%$1");
}

export function turkishText(value) {
  if (typeof value !== "string") return value;
  const cleaned = turkishPairs.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
  return decimalCommas(cleaned).replace(/(?<![\p{L}])\bdf\b(?![\p{L}])/gu, "sd");
}

const ordinalTR = {
  "ice cream sales": "dondurma satışı", "drowning deaths": "boğulma kaynaklı ölümler",
  "One-Way ANOVA": "Tek yönlü ANOVA", "matched twins": "eşleştirilmiş ikizler",
  "paired vs independent power": "eşleştirilmiş ve bağımsız tasarımlarda güç",
  "monotonic non-linear": "monoton, doğrusal olmayan ilişki", "repeated measures": "tekrarlı ölçümler",
  "ordinal ranks": "sıralı puanlar", "points follow diagonal": "noktalar köşegeni izliyor",
  "curved U-shape": "U biçimli desen", "same subjects": "aynı katılımcılar",
  "Baseline": "Başlangıç", "Week 1": "1. hafta", "Week 2": "2. hafta", "Week 4": "4. hafta",
  "Group (Drug/Placebo)": "Grup (ilaç/plasebo)", "Time (3 points)": "Zaman (üç ölçüm)",
  "at least as good": "kabul edilebilir marj içinde", "n=30, normal": "n = 30, normal dağılım",
  "Drug A": "İlaç A", "Drug B": "İlaç B", "Low Dose": "Düşük doz", "High Dose": "Yüksek doz",
  "parallel lines": "paralel çizgiler", "check homogeneity of variance": "varyansların homojenliğini incelemek",
  "Yes": "Evet", "No": "Hayır", "M": "E", "F": "K", "2x2": "2 × 2",
};

const dataKeysTR = {
  SD: "SS", Mean: "Ortalama", mean: "Ortalama", median: "Medyan", R2: "R²",
  Treatment: "Tedavi", Treatment1: "Tedavi 1", Treatment2: "Tedavi 2", Placebo: "Plasebo",
  Before: "Önce", After: "Sonra", GroupA: "Grup A", GroupB: "Grup B",
  MethodA: "Yöntem A", MethodB: "Yöntem B", LabA_SD: "Laboratuvar A · SS", LabB_SD: "Laboratuvar B · SS",
  Dept_A: "Bölüm A", Dept_B: "Bölüm B", Dept_C: "Bölüm C", Dept_D: "Bölüm D",
  samples: "Ölçümler", groups: "Grup sayısı", differences: "Farklar", meanDiff: "Ortalama fark",
  expected: "Beklenen", observed: "Gözlenen", expected_freq: "Beklenen frekans", total: "Toplam",
  CI_lower: "Alt güven sınırı", CI_upper: "Üst güven sınırı", bounds: "Sınırlar",
  waitingTimes: "Bekleme süreleri", times: "Süreler", timepoints: "Ölçüm zamanları",
  df: "Serbestlik derecesi", df_between: "Gruplar arası serbestlik derecesi", df_within: "Grup içi serbestlik derecesi",
  SS_between: "Gruplar arası kareler toplamı", SS_within: "Grup içi kareler toplamı",
  LSL: "Alt spesifikasyon sınırı (LSL)", USL: "Üst spesifikasyon sınırı (USL)", chi2: "χ²",
  Gender: "Cinsiyet", Response: "Yanıt", Males: "Erkekler", Females: "Kadınlar",
  Factor1: "Faktör 1", Factor2: "Faktör 2", Drug_p: "İlaç etkisinin p değeri",
  Dose_p: "Doz etkisinin p değeri", Interaction_p: "Etkileşimin p değeri",
  QQplot: "Q–Q grafiği", Mauchly_W: "Mauchly W", shapiro_p: "Shapiro–Wilk p", levene_p: "Levene p",
  pairwise_comparisons: "İkili karşılaştırma sayısı", comparisons: "Karşılaştırma sayısı",
  outliers: "Aykırı değer", relationship: "İlişki", residual_pattern: "Artık deseni", variables: "Değişkenler",
  slope: "Eğim", intercept: "Kesişim", Conc: "Konsantrasyon", Area: "Pik alanı",
  cohens_d: "Cohen d", oneTailed_p: "Tek taraflı p", twoTailed_p: "İki taraflı p",
  between: "Katılımcılar arası", within: "Katılımcı içi", current_power: "Mevcut güç", power: "Güç",
  delta: "Hedef fark", n_pairs: "Çift sayısı", table_size: "Tablo boyutu",
  purpose: "Amaç", goal: "Amaç", concept: "Kavram", context: "Bağlam", data_type: "Veri türü",
  pattern: "Desen", test: "Test", design: "Tasarım", alpha: "α", beta: "β",
};

const dataKeysEN = {
  R2: "R²", expected_freq: "Expected count", df: "Degrees of freedom", df_between: "Between-group degrees of freedom",
  df_within: "Within-group degrees of freedom", SS_between: "Between-groups sum of squares", SS_within: "Within-groups sum of squares",
  meanDiff: "Mean difference", cohens_d: "Cohen d", pairwise_comparisons: "Pairwise comparisons",
  LSL: "Lower specification limit (LSL)", USL: "Upper specification limit (USL)", chi2: "χ²",
  oneTailed_p: "One-sided p", twoTailed_p: "Two-sided p", Conc: "Concentration", Area: "Peak area",
  current_power: "Current power", LabA_SD: "Lab A SD", LabB_SD: "Lab B SD",
  alpha: "α", beta: "β",
};

export function caseDataLabel(key, language) {
  const labels = language === "tr" ? dataKeysTR : dataKeysEN;
  if (Object.hasOwn(labels, key)) return labels[key];
  if (language === "en" && /^[A-Za-z][\w_]*$/.test(key) && /[_a-z][A-Z]|_/.test(key)) {
    const label = key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
    return label[0].toUpperCase() + label.slice(1);
  }
  return key;
}

export function caseDataValue(value, language) {
  if (value == null) return "—";
  if (typeof value === "number") {
    return new Intl.NumberFormat(language, {
      maximumSignificantDigits: 12, useGrouping: false,
      ...(value && (Math.abs(value) < 1e-5 || Math.abs(value) >= 1e10) ? { notation: "scientific" } : {}),
    }).format(value);
  }
  if (language === "tr") {
    if (typeof value === "boolean") return value ? "Evet" : "Hayır";
    return Object.hasOwn(ordinalTR, value) ? ordinalTR[value] : turkishText(String(value));
  }
  return String(value);
}

export function reviewScenario(scenario, language) {
  const choice = caseCorrections[scenario.id];
  const i = language === "tr" ? 0 : 1;
  const toText = language === "tr" ? turkishText : (text) => typeof text === "string"
    ? text.replace(/\bvs\b(?!\.)/g, "vs.").replace(/\bnon-parametric\b/gi, "nonparametric")
    : text;
  const fields = ["title", "topic", "story", "question", "explanation", "hint"];
  const result = { ...scenario, data: choice?.data?.[i] ?? scenario.data };
  for (const field of fields) {
    const value = choice?.[field]?.[i] ?? scenario[field];
    if (value != null) result[field] = toText(value);
  }
  result.options = scenario.options.map((option, index) => ({
    ...option, text: toText(choice?.options?.[index]?.[i] ?? option.text),
  }));
  return result;
}

const formulaNotation = {
  median: ["Sıralı veride ortadaki değer. n çiftse ortadaki iki değerin ortalaması.", "The middle sorted value. For even n, average the two middle values."],
  ci_mean: ["GA = x̄ ± t_(1−α/2, n−1) × s/√n", "CI = x̄ ± t_(1−α/2, n−1) × s/√n"],
  se_mean: ["SH = s / √n", "SE = s / √n"],
  ftest: ["F = s₁² / s₂²", "F = s₁² / s₂²"],
  anova_f: ["F = KO_gruplar arası / KO_grup içi = [KT_A/(k−1)] / [KT_İ/(N−k)]", "F = MS_between / MS_within = [SSB/(k−1)] / [SSW/(N−k)]"],
  ss_between: ["KT_A = Σnᵢ(x̄ᵢ − x̄)²", "SSB = Σnᵢ(x̄ᵢ − x̄)²"],
  ss_within: ["KT_İ = ΣΣ(xᵢⱼ − x̄ᵢ)²", "SSW = ΣΣ(xᵢⱼ − x̄ᵢ)²"],
  eta_squared: ["η² = KT_A / KT_toplam", "η² = SSB / SST"],
  bonferroni: ["α_düz = α / k (k = karşılaştırma sayısı)", "α_adj = α / k (k = number of comparisons)"],
  expected_freq: ["E = (Satır toplamı × Sütun toplamı) / Genel toplam", "E = (Row total × Column total) / Grand total"],
  power_formula: ["n ≈ 2[(z_(1−α/2) + z_(1−β))/d]²", "n ≈ 2[(z_(1−α/2) + z_(1−β))/d]²"],
  power_definition: ["Güç = 1 − β = P(H₀’ın reddedilmesi | belirli alternatif)", "Power = 1 − β = P(reject H₀ | specified alternative)"],
  type_errors: ["α = P(H₀’ı reddetmek | H₀ doğru), β = P(H₀’ı reddedememek | belirli alternatif)", "α = P(reject H₀ | H₀ true), β = P(fail to reject H₀ | specified alternative)"],
  tost: ["H₀₁: μ₁ − μ₂ ≤ −δ, H₀₂: μ₁ − μ₂ ≥ δ. Eşdeğerlik için iki H₀ da reddedilir.", "H₀₁: μ₁ − μ₂ ≤ −δ, H₀₂: μ₁ − μ₂ ≥ δ. Reject both null hypotheses to conclude equivalence."],
  bioequivalence: ["%90 GA(GOO) ⊆ [%80,00; %125,00]", "90% CI(GMR) ⊆ [80.00%, 125.00%]"],
};

const formulaExamples = {
  mean: ["Veriler 10,08 · 10,11 · 10,09 · 10,10 · 10,12. Ortalama = 50,50/5 = 10,10.", "Values: 10.08, 10.11, 10.09, 10.10 and 10.12. Mean = 50.50/5 = 10.10."],
  std: ["s = √(0,0010/4) ≈ 0,016 mL", "s = √(0.0010/4) ≈ 0.016 mL"],
  cv: ["Ortalama = 99,0 ve SS = 0,14. CV ≈ %0,14.", "Mean = 99.0 and SD = 0.14. CV ≈ 0.14%."],
  median: ["5, 6, 7, 8, 45 için medyan 7, ortalama 14,2’dir.", "For 5, 6, 7, 8 and 45, the median is 7 and the mean is 14.2."],
  iqr: ["12, 15, 18, 19, 20, 21, 22, 25, 45. R tip 7 ile Q₁ = 18 ve Q₃ = 22. IQR = 4.", "12, 15, 18, 19, 20, 21, 22, 25, 45. With R type 7, Q₁ = 18 and Q₃ = 22. IQR = 4."],
  ci_mean: ["n = 10, x̄ = 50,06, s = 0,956. %95 GA ≈ [49,38; 50,74].", "n = 10, x̄ = 50.06, s = 0.956. The 95% CI is about [49.38, 50.74]."],
  ttest_onesample: ["H₀: μ = 50. x̄ = 50,06, s = 0,956 ve n = 5 için t ≈ 0,14.", "H₀: μ = 50. With x̄ = 50.06, s = 0.956 and n = 5, t ≈ 0.14."],
  ttest_paired: ["Önce ve sonra ölçümlerinde her kişinin farkını hesaplayın. Farklara tek örneklem t-testi uygulayın.", "For before-and-after measurements, compute each person’s difference and apply a one-sample t-test to the differences."],
  bonferroni: ["10 karşılaştırma için α = 0,05 ise karşılaştırma başına eşik 0,005’tir.", "With 10 comparisons and α = 0.05, the per-comparison threshold is 0.005."],
  r_squared: ["Sabit terimli basit modelde r = 0,75 ise R² = 0,5625. Model değişkenliğin %56,25’ini açıklar.", "For a simple model with an intercept, r = 0.75 gives R² = 0.5625. The model explains 56.25% of the variation."],
  cpk: ["Üst sınır 525, alt sınır 475, μ = 510, σ = 5. Cpk = min(1,00; 2,33) = 1,00.", "USL = 525, LSL = 475, μ = 510, σ = 5. Cpk = min(1.00, 2.33) = 1.00."],
  power_formula: ["d = 0,5, α = 0,05 ve %80 güç için normal yaklaşımla grup başına yaklaşık 63 kişi.", "With d = 0.5, α = 0.05 and 80% power, the normal approximation gives about 63 participants per group."],
  bioequivalence: ["%90 GA [%85; %115] ise bu parametre standart aralık ölçütünü karşılar.", "A 90% CI of [85%, 115%] meets the standard interval criterion for this endpoint."],
  error_sum: ["Bürette başlangıç ve son okumalarının bağımsız standart belirsizlikleri 0,02 mL ise hacmin standart belirsizliği yaklaşık 0,028 mL’dir.", "Independent initial and final burette readings with standard uncertainties of 0.02 mL give a volume standard uncertainty of about 0.028 mL."],
};

const formulaDescriptions = {
  variance: ["Örneklemde ortalamadan sapmaların kareleri toplanıp n−1’e bölünür. Birimi ölçüm biriminin karesidir.", "Sum squared deviations from the mean and divide by n−1. The units are the square of the measurement units."],
  std: ["Örneklem varyansının kareköküdür. Yayılımı ölçümün kendi biriminde gösterir.", "The square root of the sample variance. It expresses spread in the original measurement units."],
  cv: ["Standart sapmayı ortalamaya göre ölçekler. Anlamlı bir sıfır noktası ve sıfırdan uzak, pozitif bir ortalama gerektirir.", "Scales standard deviation by the mean. Use data with a meaningful zero and a positive mean away from zero."],
  iqr: ["Üçüncü ve birinci çeyreklik arasındaki fark, ortadaki %50’lik bölümün yayılımını özetler. Çeyreklik hesaplama yöntemi belirtilmelidir.", "The third minus the first quartile summarizes the spread of the middle 50%. State which quantile method is used."],
  ci_mean: ["Bu yöntemle aynı koşullarda tekrar tekrar aralık oluşturulursa, örneğin %95 düzeyinde aralıkların yaklaşık %95’i popülasyon ortalamasını kapsar. t, ilgili Student t kritik değeridir.", "If intervals are repeatedly constructed under the same conditions, about 95% of 95% intervals will cover the population mean. t denotes the applicable Student t critical value."],
  se_mean: ["Bağımsız gözlemler altında örneklem ortalamasının standart hatasını tahmin eder.", "Estimates the standard error of the sample mean for independent observations."],
  ttest_onesample: ["Popülasyon ortalamasının belirtilen μ₀ değerine eşitliği sınanır.", "Tests whether the population mean equals the prespecified value μ₀."],
  ttest_independent: ["İki bağımsız grubun ortalamalarını karşılaştırır. Ortak varyans, sₚ² = [(n₁−1)s₁² + (n₂−1)s₂²]/(n₁+n₂−2) ile tahmin edilir.", "Compares means from two independent groups. Estimate the common variance as sₚ² = [(n₁−1)s₁² + (n₂−1)s₂²]/(n₁+n₂−2)."],
  ttest_welch: ["İki bağımsız grubun ortalamalarını eşit varyans varsayımı olmadan karşılaştırır. Serbestlik derecesi Welch–Satterthwaite yaklaşımıyla hesaplanır.", "Compares two independent means without assuming equal variances. Use the Welch–Satterthwaite approximation for degrees of freedom."],
  ttest_paired: ["Her çift için farkı alın. n çift sayısı, d̄ ortalama fark ve sᵈ farkların örneklem standart sapmasıdır.", "Calculate the difference for each pair. n is the number of pairs, d̄ the mean difference and sᵈ the sample standard deviation of the differences."],
  effect_size_d: ["Ortalama farkını ortak örneklem standart sapması biriminde ifade eder. Farkın uygulamadaki önemini konuya özgü eşiklerle yorumlayın.", "Expresses the mean difference in pooled sample standard deviation units. Interpret practical importance using context-specific benchmarks."],
  ftest: ["İki bağımsız normal grubun varyanslarını karşılaştırır. Varyansları hangi sırada böldüğünüz, serbestlik derecelerinin ve kuyrukların seçimini belirler.", "Compares variances from two independent normal groups. The order of the ratio determines the associated degrees of freedom and tails."],
  anova_f: ["Gruplar arası kareler ortalamasını grup içi kareler ortalamasına böler. Anlamlı F, tüm popülasyon ortalamalarının eşitliği hipotezine karşı kanıttır.", "Divides the between-groups mean square by the within-groups mean square. A significant F provides evidence against equality of all population means."],
  eta_squared: ["Tek yönlü ANOVA’da gruplar arası kareler toplamının toplam kareler toplamına oranıdır.", "In one-way ANOVA, the between-groups sum of squares divided by the total sum of squares."],
  bonferroni: ["Planlanan karşılaştırmaların oluşturduğu ailede en az bir Tip I hata olasılığını kontrol eder.", "Controls the probability of at least one Type I error across a family of planned comparisons."],
  r_squared: ["Modelin açıkladığı gözlem değişkenliğinin oranı. R² = r², sabit terimli basit doğrusal regresyon için geçerlidir.", "The fraction of observed variation accounted for by the model. R² = r² holds for simple linear regression with an intercept."],
  sy_x: ["Sabit terimli basit doğrusal regresyonda artıkların tipik büyüklüğünü yanıt değişkeninin biriminde özetler.", "Summarizes the residual scale in outcome units for simple linear regression with an intercept."],
  expected_freq: ["Bağımsızlık hipotezi altında, çapraz tablonun bir hücresi için beklenen gözlem sayısı.", "The expected cell count in a contingency table under the hypothesis of independence."],
  cp: ["Kararlı bir proseste spesifikasyon genişliğini grup içi proses değişkenliğiyle karşılaştırır. Merkezlemeyi hesaba katmaz.", "Compares the specification width with within-process variation for a stable process. It does not account for centering."],
  cpk: ["Kararlı bir prosesin en yakın spesifikasyon sınırına uzaklığını grup içi standart sapma ile ölçekler.", "Scales the distance to the nearest specification limit by the within-process standard deviation for a stable process."],
  ppk: ["En yakın spesifikasyon sınırına uzaklığı, incelenen dönemin genel standart sapması ile ölçekler.", "Scales the distance to the nearest specification limit by the overall standard deviation for the period studied."],
  mann_whitney: ["İki bağımsız grubun birleşik sıralarından hesaplanır. R₁, birinci grubun sıra toplamıdır. Konum farkı yorumu ek dağılım varsayımları gerektirir.", "Uses the pooled ranks from two independent groups. R₁ is the rank sum of group 1. A location-shift interpretation requires additional distributional assumptions."],
  wilcoxon: ["Eşleştirilmiş farkların mutlak değerlerini sıralayın. W⁺ ve W⁻ pozitif ve negatif farkların sıra toplamlarıdır. İki taraflı istatistik yazılıma göre farklı gösterilebilir.", "Rank the absolute paired differences. W⁺ and W⁻ are the rank sums for positive and negative differences. Software may report different forms of the two-sided statistic."],
  power_formula: ["Dengeli tasarımda iki bağımsız ortalamanın iki taraflı karşılaştırılması için normal yaklaşım. n grup başına sayıyı, d standartlaştırılmış hedef farkı gösterir.", "Normal approximation for a two-sided comparison of two independent means in a balanced design. n is per-group sample size and d is the standardized target difference."],
  power_definition: ["Güç, belirlenen etki büyüklüğü ve çalışma varsayımları altında H₀’ı reddetme olasılığıdır.", "Power is the probability of rejecting H₀ under a specified effect and study assumptions."],
  tost: ["İki tek taraflı test (TOST), farkın önceden belirlenmiş ±δ marjları içinde kaldığını değerlendirir.", "Two one-sided tests (TOST) assess whether the difference lies within the prespecified margins ±δ."],
  bioequivalence: ["ICH M13A’nın standart bağlamında test/karşılaştırıcı geometrik ortalama oranının (GOO) %90 güven aralığı ilgili her farmakokinetik parametre için değerlendirilir.", "In the standard ICH M13A setting, assess the 90% confidence interval for the test/comparator geometric mean ratio (GMR) for each applicable pharmacokinetic endpoint."],
  error_sum: ["Bağımsız girdilerin standart belirsizlikleri, toplama veya çıkarma işleminde kareleri üzerinden birleştirilir.", "For addition or subtraction, combine independent input standard uncertainties in quadrature."],
  error_mult: ["Bağımsız girdilerde küçük göreli belirsizliklerin çarpım veya bölüme yayılımı için birinci dereceden yaklaşım.", "First-order propagation of small relative uncertainties through multiplication or division of independent inputs."],
};

const millerChapters = {
  descriptive: "2", confidence: "2", ttest: "3", anova: "4", correlation: "5", regression: "5",
  variance: "3–4", nonparametric: "6", propagation: "2", capability: "4",
};

export function reviewFormula(formula) {
  const notation = formulaNotation[formula.id];
  const example = formulaExamples[formula.id];
  const description = formulaDescriptions[formula.id];
  const chapter = formula.millerRef ? millerChapters[formula.topic] : undefined;
  const titleTR = { effect_size_d: "Cohen’in d katsayısı", ftest: "Varyanslar için F testi", bioequivalence: "Ortalama biyoeşdeğerlik (ABE)", se_mean: "Ortalamanın standart hatası" }[formula.id];
  return {
    ...formula, titleTR: titleTR ?? turkishText(formula.titleTR).replace(/\s&\s/g, " ve "),
    formula: notation?.[1] ?? formula.formula, formulaTR: notation?.[0] ?? formula.formula,
    description: description?.[1] ?? formula.description, descriptionTR: description?.[0] ?? turkishText(formula.descriptionTR),
    example: example?.[1], exampleTR: example?.[0],
    millerRef: chapter ? `${chapter.includes("–") ? "Chapters" : "Chapter"} ${chapter}` : undefined,
    millerRefTR: chapter ? `Bölüm ${chapter}` : undefined,
  };
}

const guideReview = {
  descriptive: {
    points: [["Ortalama ve standart sapma, dağılım dengeliyse yararlı özetlerdir.", "The mean and standard deviation are useful for reasonably symmetric data."], ["Çarpık dağılımlarda medyan ve IQR daha dayanıklı özetlerdir.", "The median and IQR are more resistant summaries for skewed distributions."], ["Standart sapma gözlemlerin, standart hata ortalama tahmininin değişkenliğini özetler.", "Standard deviation summarizes variation among observations. Standard error quantifies uncertainty in the estimated mean."]],
    mistakes: [["Birimleri veya çeyreklik yöntemini belirtmemek.", "Omitting units or the quantile method."], ["Ortalamayı ve yayılımı dağılım grafiğine bakmadan yorumlamak.", "Interpreting center and spread without viewing the distribution."]],
  },
  normality: {
    points: [["Modelin varsayımına göre ham puanlar, grup içi artıklar veya eşleştirilmiş farklar incelenir.", "Inspect observations, within-group residuals or paired differences according to the model assumption."], ["Q–Q grafiğini örneklem büyüklüğü ve aykırı değerlerle birlikte yorumlayın.", "Interpret the Q–Q plot in light of sample size and possible outliers."], ["p > 0,05, normallik hipotezini reddetmek için kanıtın yetersiz kaldığını gösterir.", "p > 0.05 gives insufficient evidence to reject the normality hypothesis."]],
    mistakes: [["n ≥ 30’u her durumda geçerli bir eşik saymak.", "Treating n ≥ 30 as a universal threshold."], ["Bir normallik testine bakarak araştırma sorusunu karşılamayan yöntem seçmek.", "Letting one normality test dictate a method that answers a different research question."]],
  },
  ttest: {
    points: [["Tek örneklem, bağımsız gruplar ve eşleştirilmiş ölçümler için farklı t-testleri kullanılır.", "One-sample, independent-group and paired designs use different t-tests."], ["Welch testi, bağımsız gruplarda eşit varyans varsayımı gerektirmez.", "Welch’s test compares independent groups without assuming equal variances."], ["Ortalama farkını, güven aralığını ve p değerini birlikte yorumlayın.", "Interpret the mean difference, confidence interval and p-value together."]],
    mistakes: [["Tek taraflı testi sonuçları gördükten sonra seçmek.", "Choosing a one-sided test after seeing the results."], ["Aynı kişiden gelen ölçümleri bağımsız saymak.", "Treating repeated measurements from the same person as independent."]],
  },
  anova: {
    points: [["Anlamlı genel F testi en az iki ortalamanın farklı olduğuna işaret eder.", "A significant omnibus F test indicates that at least two means differ."], ["İkili farklar araştırılıyorsa karşılaştırmaları ve çokluk düzeltmesini planlayın.", "If pairwise differences are of interest, plan the comparisons and multiplicity adjustment."], ["Bağımsızlığı, artıkların dağılımını ve varyansların benzerliğini inceleyin.", "Assess independence, the distribution of residuals and the similarity of variances."]],
    mistakes: [["Anlamlı genel testten her grubun birbirinden farklı olduğu sonucunu çıkarmak.", "Concluding from a significant omnibus test that every pair differs."], ["Çok sayıda karşılaştırmayı hata oranını kontrol etmeden yürütmek.", "Running multiple comparisons without controlling the error rate."]],
  },
  correlation: {
    points: [["Pearson r, doğrusal ilişkinin yönünü ve büyüklüğünü özetler.", "Pearson r summarizes the direction and magnitude of a linear association."], ["Regresyon modelini artık grafikleriyle ve çalışılan aralıkta değerlendirin.", "Assess the regression model using residual plots and within the range studied."], ["Kalibrasyonda R² ile birlikte artıkların deseni ve çalışma aralığındaki performans önemlidir.", "Alongside R², examine residual patterns and performance across the calibration range."]],
    mistakes: [["İlişkiden doğrudan neden-sonuç çıkarmak.", "Inferring causation directly from association."], ["Ölçüm aralığı dışına doğrulamasız tahmin yapmak.", "Extrapolating beyond the measured range without validation."]],
  },
};

export function reviewGuide(guide) {
  const { points, mistakes } = guideReview[guide.id];
  return {
    ...guide, titleTR: turkishText(guide.titleTR).replace(/\s&\s/g, " ve "),
    descriptionTR: turkishText(guide.descriptionTR), formulas: guide.formulas.map(reviewFormula),
    keyPointsTR: points.map(([tr]) => tr), keyPoints: points.map(([, en]) => en),
    commonMistakesTR: mistakes.map(([tr]) => tr), commonMistakes: mistakes.map(([, en]) => en),
  };
}

const bloomVerbsTR = {
  remember: ["tanımla", "listele", "hatırla"], understand: ["açıkla", "betimle", "yorumla"],
  apply: ["hesapla", "uygula", "çöz"], analyze: ["karşılaştır", "ayırt et", "çözümle"],
  evaluate: ["değerlendir", "gerekçelendir", "eleştir"], create: ["tasarla", "oluştur", "geliştir"],
};

export function bloomVerbs(level, verbs, language) {
  return language === "tr" ? bloomVerbsTR[level] : verbs;
}

const rarityNames = {
  common: ["Yaygın", "Common"], uncommon: ["Az rastlanan", "Uncommon"], rare: ["Nadir", "Rare"],
  epic: ["Epik", "Epic"], legendary: ["Efsanevi", "Legendary"],
};

export function rarityLabel(rarity, language) {
  return rarityNames[rarity]?.[language === "tr" ? 0 : 1] ?? rarity;
}

const analysisMethods = [
  {
    types: ["mean_std", "std", "median", "iqr", "skewness", "cv"],
    tr: ["Ölçüm birimini ve veri dağılımını inceleyin. Gerekirse değerleri küçükten büyüğe sıralayın.", "Vakada istenen merkez veya yayılım ölçüsünü hesaplayın. IQR için çeyreklik yöntemini, CV için oran ölçeğinin uygunluğunu belirtin."],
    en: ["Inspect the measurement units and distribution. Sort the values if the statistic requires it.", "Calculate the requested measure of center or spread. State the quantile method for IQR or check whether a ratio scale supports the CV."],
  },
  {
    types: ["shapiro"],
    tr: ["Varsayımın hangi gözlemler, artıklar veya eşleştirilmiş farklar için geçerli olduğunu belirleyin.", "Q–Q grafiğini ve Shapiro–Wilk p değerini örneklem büyüklüğüyle birlikte değerlendirin."],
    en: ["Identify whether the assumption applies to observations, residuals or paired differences.", "Interpret the Q–Q plot and Shapiro–Wilk p-value in light of the sample size."],
  },
  {
    types: ["tTest", "effectSize", "welch", "pairedT"],
    tr: ["Örneklemlerin bağımsız mı, eşleştirilmiş mi olduğunu belirleyin. Eşleşme varsa her çiftin farkını alın.", "İlgili ortalama farkını ve standart hatayı hesaplayın. Güven aralığını ve p değerini etkiyle birlikte yorumlayın."],
    en: ["Identify whether samples are independent or paired. For paired observations, calculate the difference within each pair.", "Estimate the relevant mean difference and its standard error. Interpret the confidence interval and p-value alongside the effect."],
  },
  {
    types: ["levene", "fTest"],
    tr: ["Grupların bağımsızlığını ve seçilen varyans testinin varsayımlarını inceleyin.", "Test istatistiğini ve p değerini değerlendirin. Ortalama karşılaştırmasında varyans modelini araştırma tasarımıyla birlikte seçin."],
    en: ["Check group independence and the assumptions of the selected variance test.", "Interpret the test statistic and p-value. Choose the variance model for mean comparisons in light of the study design."],
  },
  {
    types: ["anova", "etaSquared", "posthoc", "bonferroni", "twoWayAnova", "rmAnova"],
    tr: ["Grupları, faktörleri ve varsa tekrarlı ölçümleri tanımlayın. Modeli gözlemlerin bağımlılık yapısına göre seçin.", "İlgili ana etkiyi, etkileşimi veya planlanan karşılaştırmayı değerlendirin. Birden çok çıkarım için hata oranı planını uygulayın."],
    en: ["Identify groups, factors and any repeated measurements. Choose a model that reflects dependence among observations.", "Assess the relevant main effect, interaction or planned contrast. Apply the planned error-rate procedure across multiple inferences."],
  },
  {
    types: ["correlation", "spearman", "regression"],
    tr: ["Saçılım grafiğinden ilişkinin yönünü, biçimini ve aykırı değerleri inceleyin.", "Araştırma sorusuna uygun korelasyon katsayısını veya regresyon modelini kullanın. Regresyonda artıkları ve çalışma aralığını inceleyin."],
    en: ["Inspect the scatterplot for direction, shape and unusual observations.", "Use the correlation coefficient or regression model that answers the question. For regression, inspect residuals and the working range."],
  },
  {
    types: ["chiSquare", "chiSquareGOF", "cramersV"],
    tr: ["Gözlenen sayıları ve H₀ altındaki beklenen sayıları belirleyin. Ki-kare yaklaşımının uygunluğunu inceleyin.", "Test istatistiğini ilgili serbestlik derecesiyle yorumlayın. İlişkinin büyüklüğü soruluyorsa uygun etki ölçüsünü kullanın."],
    en: ["Determine observed counts and expected counts under H₀. Check whether the chi-square approximation is appropriate.", "Interpret the statistic with the relevant degrees of freedom. Use a suitable effect measure if the question concerns association strength."],
  },
  {
    types: ["cpk"],
    tr: ["Prosesin kararlılığını ve alt/üst spesifikasyon sınırlarını kontrol edin.", "Ortalamadan her sınıra uzaklığı grup içi standart sapmanın üç katına bölün. Cpk bu iki değerin küçüğüdür."],
    en: ["Check process stability and identify the lower and upper specification limits.", "Divide each distance from the mean to a limit by three within-process standard deviations. Cpk is the smaller value."],
  },
  {
    types: ["mannWhitney", "wilcoxon", "kruskal", "friedman"],
    tr: ["Grupların bağımsız mı, gözlemlerin eşleştirilmiş mi olduğunu belirleyin.", "Uygun sıra testini seçin. Farkın yönünü ve büyüklüğünü yorumlarken yöntemin ve dağılımın varsayımlarını göz önünde tutun."],
    en: ["Identify independent groups or matched observations.", "Select the corresponding rank test. Check assumptions before interpreting the direction or magnitude of a difference."],
  },
  {
    types: ["power"],
    tr: ["Hedef farkı, beklenen değişkenliği, tasarımı ve anlamlılık düzeyini belirleyin.", "Bu koşullar altında gücü veya gerekli örneklem büyüklüğünü hesaplayın. Varsayımlar değişirse hesabı tekrar değerlendirin."],
    en: ["Specify the target effect, expected variability, study design and significance level.", "Calculate power or the required sample size under those conditions. Reassess the result if assumptions change."],
  },
  {
    types: ["tost"],
    tr: ["Hedef parametreyi, uygun ölçeği ve önceden belirlenen marjı saptayın.", "İlgili güven aralığını verilen marjlarla karşılaştırın. Aşağı olmama için ilgili tek sınırı, eşdeğerlik için iki sınırı değerlendirin."],
    en: ["Identify the target parameter, appropriate scale and prespecified margin.", "Compare the relevant confidence interval with the stated margins. Non-inferiority uses the relevant one-sided bound. Equivalence uses both bounds."],
  },
];

export function calculationSteps(type, language) {
  return analysisMethods.find(({ types }) => types.includes(type))?.[language];
}
