# 🧱 Eurocode 2 (EN 1992-1-1 / EC2) – Concrete Structural Class Calculator

Use this open-source tool to quickly and accurately calculate the structural class of concrete according to Eurocode 2 (EN 1992-1-1 / EC2) durability requirements.

## 🔍 Overview

Welcome to the **Concrete Structural Class Calculator**.  
This tool helps engineers, architects, and students determine the appropriate structural class of concrete for their projects, ensuring compliance with Eurocode standards.

By entering values such as service life, exposure class, concrete strength, cement type, and reinforcement cover conditions, you’ll receive a reliable recommendation tailored to your design.

---

## ⚙️ How to Use

Fill in the specific values for each parameter:

### 1. Service Life  
Define the intended lifespan of the structure in years.

### 2. Exposure Class  
Select the appropriate exposure class based on the environmental conditions surrounding the concrete structure:

- `XC`: Carbonation (low aggressiveness)  
- `XD`: Chlorides from de-icing salts  
- `XS`: Chlorides from seawater  
- `XF`: Freeze/thaw cycles  
- `XA`: Chemical attack

### 3. Concrete Strength Class  
Choose the characteristic strength class, such as `C20/25`, `C30/37`, etc.  
This depends on structural load-bearing and performance requirements.

### 4. Cement Type  
Select the cement type used in the concrete mix:

- `CEM I`: Portland cement  
- `CEM I (CV)`: Portland cement without fly ash  
- `CEM II`: Composite cement  
- `CEM III`: Blast furnace cement  
- `CEM IV`: Pozzolanic cement  
- `CEM V`: Composite cement

### 5. Reinforcement Cover Type  
Specify the compaction condition of the concrete around the reinforcement:

- **Compact cover**: Good compaction  
- **Non-compact cover**: Poor compaction  

> Compact cover typically applies to reinforcement near the bottom surface of slabs or ribbed floors cast horizontally on industrial or metal formwork.

---

## 📐 Result

Once all parameters are entered, the tool automatically calculates the recommended **structural class (`S1` to `S6`)** for your concrete design.

---

## 🌐 Live Demo

Try the calculator online at:  
👉 [Concrete Structural Class Calculator – beton-guide.com](https://beton-guide.com/calcul/calcul-classe-structurale-beton-outil-ligne.html)

---

## 🔗 Standards & References

- Eurocode 2: EN 1992-1-1:2004 (Design of concrete structures – General rules and rules for buildings)  
- National Annexes may apply depending on country-specific regulations

📄 License

This project is open source under the MIT License 

👤 Author & Maintainer

Dimitry Lyubichev
Civil Engineer (Building Engineering Institute, Kiev, MSc equivalent)
Experience: construction worker, design office technician, RC draftsman, concrete technologist.
Creator of [beton-guide.com](https://beton-guide.com) 

---

## 📦 Installation & Integration

This project can be reused or integrated into other tools:  

```bash
# Clone repository
git clone https://github.com/Damon201202/eurocode2-concrete-structural-class-calculator.git
