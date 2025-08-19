/*!
 * Copyright © 2025 Dimitry Lyubichev / beton-guide.com.
 * All rights reserved. Unauthorized reproduction or use is strictly prohibited.
 */

// Structural class calculation (English, adapted to your HTML)

document.addEventListener('DOMContentLoaded', () => {
  const hooks = [
    '.calcul-four-select_duree',
    '.calcul-four-select-classe_exposition',
    '.calcul-four-select-classe_beton',
    '.calcul-four-select-cem1',
    '.calcul-four-select-enr_compact'
  ];
  hooks.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.addEventListener('change', calculEnrobage);
  });
  calculEnrobage();
});

let fck = 25;

function calculEnrobage() {
  // 1) Service life text
  const select_duree = document.querySelector('.calcul-four-select_duree');
  let duree = Number(select_duree?.value || 50);

  const dureeEl = document.querySelector('.calcul-four_duree');
  if (dureeEl) {
    switch (String(duree)) {
      case '10':
        dureeEl.innerHTML = 'Temporary structures.';
        break;
      case '15':
        dureeEl.innerHTML = 'Replaceable structural elements, such as bearings.';
        break;
      case '25':
        dureeEl.innerHTML = 'Agricultural and similar structures.';
        break;
      case '50':
        dureeEl.innerHTML = 'Buildings and other common structures.';
        break;
      case '100':
        dureeEl.innerHTML = 'Monumental building structures, bridges and other civil engineering works.';
        break;
    }
  }

  // 2) Exposure class mapping (XO=0, XC=1+, XD=2+, XS=3+, XF=4+, XA=5+)
  const select_classeExposition = document.querySelector('.calcul-four-select-classe_exposition');
  let classeExposition = 20; // proxy min strength for warning
  let expValue = 11;
  let beton = 'C20/25';

  switch (select_classeExposition?.value) {
    case 'XO':  classeExposition = 12; expValue = 0;  beton = 'C12/15'; break;
    case 'XC1': classeExposition = 20; expValue = 11; beton = 'C20/25'; break;
    case 'XC2': classeExposition = 20; expValue = 12; beton = 'C20/25'; break;
    case 'XC3': classeExposition = 25; expValue = 13; beton = 'C25/30'; break;
    case 'XC4': classeExposition = 30; expValue = 14; beton = 'C30/37'; break;
    case 'XD1': classeExposition = 25; expValue = 21; beton = 'C25/30'; break;
    case 'XD2': classeExposition = 30; expValue = 22; beton = 'C30/37'; break;
    case 'XD3': classeExposition = 35; expValue = 23; beton = 'C35/45'; break;
    case 'XS1': classeExposition = 30; expValue = 31; beton = 'C30/37'; break;
    case 'XS2': classeExposition = 30; expValue = 32; beton = 'C30/37'; break;
    case 'XS3': classeExposition = 35; expValue = 33; beton = 'C40/50'; break;
    case 'XF1': classeExposition = 25; expValue = 41; beton = 'C25/30'; break;
    case 'XF2': classeExposition = 25; expValue = 42; beton = 'C25/30'; break;
    case 'XF3': classeExposition = 30; expValue = 43; beton = 'C30/37'; break;
    case 'XF4': classeExposition = 35; expValue = 44; beton = 'C35/45'; break;
    case 'XA1': classeExposition = 30; expValue = 51; beton = 'C30/37'; break;
    case 'XA2': classeExposition = 35; expValue = 52; beton = 'C35/45'; break;
    case 'XA3': classeExposition = 40; expValue = 53; beton = 'C40/50'; break;
  }

  // 3) Concrete strength class -> fck
  const select_fck = document.querySelector('.calcul-four-select-classe_beton');
  switch (select_fck?.value) {
    case '12-15': fck = 12; break;
    case '16-20': fck = 16; break;
    case '20-25': fck = 20; break;
    case '25-30': fck = 25; break;
    case '30-37': fck = 30; break;
    case '35-45': fck = 35; break;
    case '40-50': fck = 40; break;
    case '45-55': fck = 45; break;
    case '50-60': fck = 50; break;
  }

  // 4) Warning if strength is insufficient for exposure class
const alertEl = document.querySelector('.alert-element-classe_beton');
if (alertEl) {
  if (classeExposition > fck) {
    alertEl.innerHTML = `Warning: for this exposure class, the concrete strength class must be equal to or greater than ${beton}.`;
    alertEl.style.display = 'block'; // show alert
  } else {
    alertEl.innerHTML = '';
    alertEl.style.display = 'none'; // hide alert
  }
}


  // 5) Cement type (CEM I without fly ash = value 2 in your HTML), compact cover
  const cem1 = Number(document.querySelector('.calcul-four-select-cem1')?.value || 1);
  const cCom = Number(document.querySelector('.calcul-four-select-enr_compact')?.value || 1);

  // 6) Structural class coefficient
  let expCoef = 0;

  // Service life effect
  if (duree === 100) {
    expCoef += 2;
  }

  // CEM I without FA (value 2) and fck>=35 gives -1
  if (cem1 === 2 && fck >= 35) {
    expCoef -= 1;
  }

  // Compact cover YES (value 2) gives -1
  if (cCom === 2) {
    expCoef -= 1;
  }

  // Strength vs exposure refinements
  if (fck >= 30 && fck < 50 && (expValue === 0 || expValue === 11)) {
    expCoef -= 1;
  } else if (fck >= 50 && (expValue === 0 || expValue === 11)) {
    expCoef -= 2;
  } else if (fck >= 30 && fck < 55 && (expValue === 12 || expValue === 13)) {
    expCoef -= 1;
  } else if (fck >= 55 && (expValue === 12 || expValue === 13)) {
    expCoef -= 2;
  } else if (fck >= 35 && fck < 60 && (expValue === 14 || expValue === 41 || expValue === 43)) {
    expCoef -= 1;
  } else if (fck >= 60 && (expValue === 14 || expValue === 41 || expValue === 43)) {
    expCoef -= 2;
  } else if (fck >= 40 && fck < 60 && (expValue === 21 || expValue === 31 || expValue === 51 || expValue === 22 || expValue === 32 || expValue === 52 || expValue === 42 || expValue === 44)) {
    expCoef -= 1;
  } else if (fck >= 60 && (expValue === 21 || expValue === 31 || expValue === 51 || expValue === 22 || expValue === 32 || expValue === 52 || expValue === 42 || expValue === 44)) {
    expCoef -= 2;
  } else if (fck >= 45 && fck < 70 && (expValue === 23 || expValue === 33 || expValue === 53)) {
    expCoef -= 1;
  } else if (fck >= 70 && (expValue === 23 || expValue === 33 || expValue === 53)) {
    expCoef -= 1;
  }

  // Base S4 adjusted by expCoef
  let classeStr = 4 + expCoef;
  // Optional clamp (uncomment if you want to constrain the range)
  // classeStr = Math.min(6, Math.max(1, classeStr));

  const classeStrEl = document.querySelector('.calcul-four-beton-classe_str');
  if (classeStrEl) classeStrEl.innerHTML = `S${classeStr}`;
}
