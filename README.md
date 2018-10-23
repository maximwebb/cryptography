# Cryptography
A set of tools for breaking classical ciphers. This will include Monoalphabetic substitutions, vigenere encrpytion/decryption, string manipulation tools and more.

String Manipulation Methods
===========================

removePunc(str)
---------------
Takes a string `str`, converts it to lowercase and strips out punctuation and spaces.

Example:
```javascript
removePunc("Hello, World!");
//"helloworld"
```

splitString(str, n)
-------------------
Takes a string `str`, removes punctuation and inserts a space every `n` letters.

Example:
```javascript
splitString("Matrices are a type of data structure.", 4);
//"matr ices area type ofda tast ruct ure"
```

Cipher Encryption/Decryption Methods
====================================

caesarShift(str, type, rot)
---------------------------
Takes a string `str` and performs a Caesar Shift encryption/decryption (depending on `type`) of `rot` shifts. Preserves formatting.

Example:
```javascript
caesarShift("Lorem ipsum dolor sit amet, consectetur adipiscing elit", "encrypt", 2);
//"Nqtgo kruwo fqnqt ukv cogv, eqpugevgvwt cfkrkuekpi gnkv"
```

monoSub(str, type, key)
-----------------------
Encrypts/decrypts a string `str` using a monoalphabetic substitution cipher, using alphabet `key`. Preserves formatting.
```javascript
monoSub("Qdn fls zsk qdn bzs es qdn btts.", type="decrypt", key="zijknopdelmcbstughfqlmryxwav");
//"The sun and the man in the moon."
```

Cipher Analysis Methods
=======================

freqAnalysis(str)
-----------------
Performs a frequency analysis on a string `str`, returning the data as an ordered array of letter-frequencies, with greatest frequency first.

Example:
```javascript
freqAnalysis("There are twenty-six letters in the English Language.");
//[["e", 20.45], ["t", 13.64], ["n", 9.09], ["a", 6.82], ["g", 6.82], ["h", 6.82], ...]
```

printFreqArr(arr)
-----------------
Formats freqAnalysis output `arr` as a string.

Example:
```javascript
printFreqArr(freqAnalysis("There are twenty-six letters in the English Language."));
//"e: 20.45%, t: 13.64%, n: 9.09%, a: 6.82%, g: 6.82%, h: 6.82%, ..."
```

substringGaps(str, substr_length)
------------------------------
Searches string `str` for substrings of length `substr_length`, and returns a sorted array of all the distances between repeated substrings.

Example:
```javascript
substringGaps("hesnotthemessiahhesaverynaughtboy", 3);
//[16]
```
