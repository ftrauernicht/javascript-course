// Chapter 1 - Unit Converter
const categorySelect = document.getElementById("category-select");
const fromSelect = document.getElementById("from-select");
const toSelect = document.getElementById("to-select");
const valueInput = document.getElementById("value-input");
const convertButton = document.getElementById("convert-button");
const result = document.getElementById("result");

// Each unit's value expressed in one shared "base unit" -
// meters for length, kilograms for weight.
const lengthFactors = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.34,
  ft: 0.3048,
};

const weightFactors = {
  kg: 1,
  g: 0.001,
  lb: 0.453592,
  oz: 0.0283495,
};

const temperatureUnits = ["C", "F", "K"];

function categoryFactors(category) {
  return category === "weight" ? weightFactors : lengthFactors;
}

function createOption(unit) {
  const option = document.createElement("option");
  option.value = unit;
  option.textContent = unit;
  return option;
}

function populateUnitSelects() {
  const category = categorySelect.value;
  const unitNames =
    category === "temperature"
      ? temperatureUnits
      : Object.keys(categoryFactors(category));

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  unitNames.forEach((unit) => {
    fromSelect.appendChild(createOption(unit));
    toSelect.appendChild(createOption(unit));
  });

  if (toSelect.options.length > 1) {
    toSelect.selectedIndex = 1;
  }
}

function convertLinear(value, fromUnit, toUnit, factors) {
  const valueInBaseUnit = value * factors[fromUnit];
  return valueInBaseUnit / factors[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
  let celsius;
  if (fromUnit === "C") {
    celsius = value;
  } else if (fromUnit === "F") {
    celsius = (value - 32) * (5 / 9);
  } else {
    celsius = value - 273.15;
  }

  if (toUnit === "C") {
    return celsius;
  } else if (toUnit === "F") {
    return celsius * (9 / 5) + 32;
  } else {
    return celsius + 273.15;
  }
}

function convert() {
  const value = Number(valueInput.value);
  const category = categorySelect.value;
  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;

  const converted =
    category === "temperature"
      ? convertTemperature(value, fromUnit, toUnit)
      : convertLinear(value, fromUnit, toUnit, categoryFactors(category));

  result.textContent =
    value + " " + fromUnit + " = " + converted.toFixed(2) + " " + toUnit;
}

categorySelect.addEventListener("change", populateUnitSelects);
convertButton.addEventListener("click", convert);

populateUnitSelects();
