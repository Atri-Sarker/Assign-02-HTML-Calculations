"use strict";
/*
* Created by: Atri Sarker
* Created on: April 1st, 2024
* Description: This file contains the JS script code for the Completing the Square Calculator.
*/

// Note: I made way too many comments here

// Elements
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const inputC = document.getElementById('inputC');
const calculateBtn = document.getElementById('calculateBtn');
const resultHolder = document.getElementById('resultHolder');


// Helper Function For Rounding Numbers Properly
function fNum(num) {
  // Round Number to 2 Decimal Points
  let rounded = num.toFixed(2);
  // Remove Useless trailing Zeroes
  // This is done via casting back using Number()
  // Number() automatically ignores trailing Zeroes
  let formattedNumber = Number(rounded);

  // Returns Number if is not NaN
  // if Nan, it returns an emoji instead
  return (isNaN(formattedNumber)) ? "🚫" : formattedNumber
}


// Calculate Function for Vertex Form using Completing the Square Method
function CalculatePerfectSquare(a, b, c) {
  // Take form a(x^2) + bx + c
  // And Convert it to Vertex form m(x-h)^2 + k
  // Returns Array in form [m,h,k]

  // Steps to Convert
  // a(x^2) + bx + c
  // a(x)^2 + b(x) + c
  // a(x + b/2a )^2 + c - (b^2)/4a
  // Therefore:
  // m = a
  // h = -(b/2a)
  // k = c - (b^2)/4a

  // Code
  let m = a;
  let h = -(b / (2 * a));
  let k = c - ((b ** 2) / (4 * a));

  // Make Array Containing the values
  let res = [m, h, k];

  // Return Values
  return res;
}


function calculateQuadraticFormulaRoot(a, b, c) {
  // Take form a(x^2) + bx + c
  // And Solve for the X-Intercept:Vertex X difference
  // Via Quadratic Formula Discriminant part

  // Discriminant
  let discriminant = (b ** 2) - (4 * a * c);
  
  // Square Root of Discriminant
  let rootResult = Math.sqrt(discriminant);

  // Divide it by 2a
  let xOffset = rootResult / (2 * a);

  // Return the Calculated Value
  return xOffset;
}

function getSolutionsForX(offset, middleX) {
  // Calculate the X-intercept X values
  // via offset from quadratic formula function
  // and via middleX from vertex form

  let x1 = middleX + offset;
  let x2 = middleX - offset;

  // Return as an Array Object ( Rounded Values )
  return [x1, x2];
}

function onCalculateBtnClick() {

  // Get Inputs
  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);
  const c = parseFloat(inputC.value);

  // Calculate Vertex Form Values
  let [m, h, k] = CalculatePerfectSquare(a, b, c);

  // Vertex Form String
  let vertexForm = "" + fNum(m) + "(x" + (h >= 0 ? " - " : " + ") + fNum(Math.abs(h)) + ")²" + (k >= 0 ? " + " : " - ") + fNum(Math.abs(k));

  // Vertex Coordinate String
  let vertexCoordinate = `( ${fNum(h)} , ${fNum(k)} )`

  // Y-Intercept
  let yIntercept = c;

  // Difference between Vertex X-value and X-intercept X values
  // Used for calculating the x intercept via add&sub onto the vetex X-value
  let vertexInterceptDiff = calculateQuadraticFormulaRoot(a, b, c);

  // Get X-Intercepts using the Difference and Vertex x-value
  let xIntercepts = getSolutionsForX(vertexInterceptDiff, h);

  // Form the Result String
  let resultString = `
    Vertex Form : ${vertexForm}
    Vertex : ${vertexCoordinate}
    Y-Intercept : ${fNum(yIntercept)}

    *Extra Calculation (via Quadratic formula):
    X-Intercepts :
        Big : ${fNum(Math.max(...xIntercepts))}
        Small : ${fNum(Math.min(...xIntercepts))}
  `

  // Display the result on the webpage
  resultHolder.innerText = resultString;

  return;
}


// Function To Deactivate Buttons if Inputs not filled correctly
function validateInputs() {
  let valid = true;

  // Checks, regex checks ( I originally used .match() but decided to use RegExp().test() arbitrarily)
  let checkA = RegExp(inputA.pattern).test(inputA.value) && (inputA.value != "");
  let checkB = RegExp(inputB.pattern).test(inputB.value) && (inputB.value != "");
  let checkC = RegExp(inputC.pattern).test(inputC.value) && (inputC.value != "")

  // Validate
  valid = Boolean(checkA && checkB && checkC);


  // Disable Button if Invalid
  calculateBtn.disabled = !valid;

  return;
}

// Connect Inputs to Validation Function
inputA.oninput = validateInputs;
inputB.oninput = validateInputs;
inputC.oninput = validateInputs;

// Initial Call, To disable the button
validateInputs();

// Connect Button Click to the Calulate Function
calculateBtn.onclick = onCalculateBtnClick