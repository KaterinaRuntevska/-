const prompt = require('prompt-sync')();

function zapochniAplikacija() {
    let siteStudenti = [];
    let prodolzhi = true;

    while (prodolzhi) {
        let vnes = prompt("Колку студенти сакате да внесете? ");
        let brojNaStudenti = parseInt(vnes);

        if (isNaN(brojNaStudenti) || brojNaStudenti <= 0) {
            console.log("❌ Ве молиме внесете валиден број.");
            continue;
        }

        for (let i = 0; i < brojNaStudenti; i++) {
            console.log(`\n--- Внес за студент бр. ${i + 1} ---`);
            let ime = prompt("Внесете име: ");
            let brojPredmeti = parseInt(prompt(`Колку предмети има ${ime}? `));
            let sumiOcenki = 0;
            let j = 0;

            while (j < brojPredmeti) {
                let ocenka = parseFloat(prompt(`Внесете оценка за предмет ${j + 1} (1-10): `));

                if (!isNaN(ocenka) && ocenka >= 1 && ocenka <= 10) {
                    sumiOcenki += ocenka;
                    j++;
                } else {
                    console.log("⚠️ Грешка: Оценката мора да биде помеѓу 1 и 10.");
                }
            }

            let prosek = sumiOcenki / brojPredmeti;
            let status = prosek < 5 ? "Не поминал" : "Поминал";

            siteStudenti.push({
                ime: ime,
                prosek: parseFloat(prosek.toFixed(2)),
                status: status
            });
        }

        // Приказ на извештајот
        pechatiIzveshtaj(siteStudenti);
        najdiNajdobar(siteStudenti);

        let odgovor = prompt("Дали сакате да внесете нова група студенти? (da/ne): ").toLowerCase();
        if (odgovor !== "da") {
            prodolzhi = false;
            console.log("\n👋 Програмата е завршена. Пријатен ден!");
        }
    }
}

function pechatiIzveshtaj(lista) {
    console.log("\n==============================");
    console.log("📊 ИЗВЕШТАЈ ЗА СИТЕ СТУДЕНТИ:");
    lista.forEach(s => {
        console.log(`- ${s.ime} | Просек: ${s.prosek} | Статус: ${s.status}`);
    });
}

function najdiNajdobar(lista) {
    if (lista.length === 0) return;
    let najdobar = lista.reduce((max, s) => (s.prosek > max.prosek ? s : max), lista[0]);
    console.log("------------------------------");
    console.log(`🏆 НАЈДОБАР СТУДЕНТ: ${najdobar.ime} (${najdobar.prosek})`);
    console.log("==============================\n");
}

zapochniAplikacija();