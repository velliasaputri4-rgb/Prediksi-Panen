const durasiTanam = {
  "jagung": 100,
  "kedelai": 85,
  "kacang tanah": 90,
  "kacang hijau": 30,
  "kacang panjang": 60,
  "ubi jalar": 120,
  "singkong": 210,
  "talas": 240,
  "kentang": 125,
  "cabai merah": 90,
  "cabai rawit": 85,
  "tomat": 60,
  "bawang merah": 70,
  "bawang putih": 90,
  "wortel": 80,
  "sawi": 45,
  "bayam": 30,
  "kangkung": 25,
  "tembakau": 120,
  "kapas": 150,
  "jahe": 240,
  "kunyit": 240,
  "lengkuas": 300,
  "mentimun": 42,
  "labu": 90,
  "oyong": 70,
  "pare": 60,
  "gembili": 120,
  "sorgum": 100,
  "jewawut": 90
};

const form = document.getElementById("panenForm");
const hasilDiv = document.getElementById("hasilPanen");
const analisisDiv = document.getElementById("deteksiMasalah");

function prediksiPanen(tanaman, tanggalTanam, cuaca) {
  let durasi = durasiTanam[tanaman];

  let tanggal = new Date(tanggalTanam);
  tanggal.setDate(tanggal.getDate() + durasi);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const tanggalPanen = tanggal.toLocaleDateString('id-ID', options);

  hasilDiv.innerHTML = `
    <h3>Prediksi Panen:</h3>
    <p>Tanaman <strong>${tanaman.toUpperCase()}</strong> diperkirakan dapat dipanen pada 
    <strong>${tanggalPanen}</strong> (${durasi} hari setelah tanam).</p>
  `;

  let analisis = "";
  if (cuaca === "hujan") {
    analisis = "⚠️ Tanah terlalu basah → akar kekurangan oksigen → pertumbuhan melambat.";
  } else if (cuaca === "kering") {
    analisis = "⚠️ Kekurangan air → fotosintesis menurun → hasil panen bisa berkurang drastis.";
  } else if (cuaca === "cerah") {
    analisis = "✅ Cuaca cerah sangat baik, panen bisa lebih cepat dari prediksi normal.";
  } else if (cuaca === "berawan") {
    analisis = "⚠️ Cahaya matahari kurang → fotosintesis melambat.";
  }

  analisisDiv.innerHTML = `
    <h3>Analisis Cuaca:</h3>
    <p>${analisis}</p>
  `;

  const data = { tanaman, tanggalTanam, cuaca, hasil: hasilDiv.innerHTML, analisis: analisisDiv.innerHTML };
  localStorage.setItem("prediksi_" + tanaman, JSON.stringify(data));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tanaman = document.getElementById("tanaman").value;
  const tanggalTanam = document.getElementById("tanggalTanam").value;
  const cuaca = document.getElementById("kondisiCuaca").value;

  if (!tanaman || !tanggalTanam || !cuaca) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  prediksiPanen(tanaman, tanggalTanam, cuaca);
});

window.addEventListener("load", () => {
  hasilDiv.innerHTML = "<h3>Data Prediksi Tersimpan:</h3>";
  for (let key in localStorage) {
    if (key.startsWith("prediksi_")) {
      const data = JSON.parse(localStorage.getItem(key));
      hasilDiv.innerHTML += data.hasil;
      analisisDiv.innerHTML += data.analisis + "<hr>";
    }
  }
});
