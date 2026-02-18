# Manual QA Test Plan

This checklist covers manual verification for:

- **Input validation** (invalid, missing, and boundary values)
- **BMI math validation** (correct calculation, rounding, and category message)

## Test Environment

1. Install dependencies: `npm install`
2. Start app: `npm start`
3. Open: <http://localhost:3000>

---

## Input Validation Test Cases

> Expected validation message for invalid input:
> `Please enter a valid positive number for weight and height.`

### IV-01: All fields empty
- **Steps**
  1. Leave Weight, Feet, and Inches blank.
  2. Click **Calculate BMI**.
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-02: Weight is zero
- **Test data**: Weight = `0`, Feet = `5`, Inches = `8`
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-03: Weight is negative
- **Test data**: Weight = `-150`, Feet = `5`, Inches = `8`
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-04: Feet is zero
- **Test data**: Weight = `150`, Feet = `0`, Inches = `8`
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-05: Feet is negative
- **Test data**: Weight = `150`, Feet = `-5`, Inches = `8`
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-06: Inches is negative
- **Test data**: Weight = `150`, Feet = `5`, Inches = `-1`
- **Expected**
  - Validation message appears.
  - No BMI result is displayed.

### IV-07: Only inches is zero (valid)
- **Test data**: Weight = `150`, Feet = `5`, Inches = `0`
- **Expected**
  - BMI value is displayed.
  - A BMI category message is displayed.

### IV-08: Decimal input in feet/inches is truncated
- **Test data**: Weight = `150`, Feet = `5.9`, Inches = `8.7`
- **Expected**
  - App accepts the input, calculates BMI.
  - Since the app uses integer parsing for feet/inches, values are treated as `5` and `8`.
  - BMI should match the same result as Weight = `150`, Feet = `5`, Inches = `8`.

---

## BMI Math Validation Test Cases

### Formula used by app
- Height (inches) = `(feet * 12) + inches`
- Height (meters) = `heightInInches * 0.0254`
- Weight (kg) = `weightLbs * 0.453592`
- BMI = `weightKg / (heightMeters^2)`
- Displayed BMI is rounded to **2 decimal places**.

### Category rules used by app
- `< 18.5` → `Underweight`
- `18.5 to < 24.9` → `Normal weight`
- `25 to < 29.9` → `Overweight`
- `>= 29.9` (and values between `24.9` and `25`) → `Obesity`

> Note: due to the current threshold logic, BMI values from **24.90 to 24.99** are labeled **Obesity**.

### MV-01: Underweight scenario
- **Test data**: Weight = `105`, Feet = `5`, Inches = `8`
- **Expected BMI**: `15.97`
- **Expected category**: `Underweight`

### MV-02: Normal weight scenario
- **Test data**: Weight = `145`, Feet = `5`, Inches = `8`
- **Expected BMI**: `22.04`
- **Expected category**: `Normal weight`

### MV-03: Overweight scenario
- **Test data**: Weight = `175`, Feet = `5`, Inches = `8`
- **Expected BMI**: `26.60`
- **Expected category**: `Overweight`

### MV-04: Obesity scenario
- **Test data**: Weight = `215`, Feet = `5`, Inches = `8`
- **Expected BMI**: `32.68`
- **Expected category**: `Obesity`

### MV-05: Rounding check
- **Test data**: Weight = `150`, Feet = `5`, Inches = `8`
- **Expected BMI**: `22.81`
- **Expected category**: `Normal weight`
- **Validation**
  - Confirm BMI is displayed with exactly 2 decimal places.

---

## Regression Spot Check

After any validation or calculation changes, rerun at minimum:
- IV-01 (empty fields)
- IV-06 (negative inches)
- MV-02 (normal)
- MV-04 (obesity)

