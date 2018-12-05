class Matrix extends Array {
	constructor(arr, row, col) {
		super();
		this.rowNum = row;
		this.colNum = col;

		for (let i = 0; i < this.rowNum; i++) {
			this.push([]);
			for (let j = 0; j < this.colNum; j++) {
				this[i].push(arr[i * this.colNum + j]);
			}
		}
	}

	static clone(m1) {
		let arr = [];
		for (let i = 0; i < m1.rowNum; i++) {
			for (let j = 0; j < m1.colNum; j++) {
				arr.push(m1[i][j]);
			}
		}
		return new Matrix(arr, m1.rowNum, m1.colNum);
	}

	static add(m1, m2) {
		if (m1.rowNum !== m2.rowNum || m1.colNum !== m2.colNum) {
			console.error('Incompatible matrices.');
		}
		let tmpArr = [];
		for (let i = 0; i < m1.rowNum; i++) {
			for (let j = 0; j < m1.colNum; j++) {
				tmpArr.push(m1[i][j] + m2[i][j]);
			}
		}

		return new Matrix(tmpArr, m1.rowNum, m1.colNum);
	}

	static multiply(m1, m2) {
		if (m1.colNum !== m2.rowNum) {
			console.error('Incompatible matrices.');
		}
		let tmpArr = [];
		for (let i = 0; i < m1.rowNum; i++) {
			for (let j = 0; j < m2.colNum; j++) {
				tmpArr.push(0);
				for (let k = 0; k < m1.colNum; k++) {
					tmpArr[i * m2.colNum + j] += m1[i][k] * m2[k][j];
				}
			}
		}
		return new Matrix(tmpArr, m1.rowNum, m2.colNum);
	}

	static determinant(m1) {
		if (m1.rowNum !== m1.colNum) {
			console.error('Non-square matrix.');
		}
		let m2 = this.clone(m1);
		for (let i = 0; i < m2.colNum - 1; i++) {
			for (let j = i + 1; j < m2.rowNum; j++) {
				let multiplier = m2[j][i] / m2[i][i];
				m2[j][i] = 0;
				for (let k = i + 1; k < m2.colNum; k++) {
					m2[j][k] = m2[j][k] - multiplier * m2[i][k];
				}
			}

		}
		res = 1;
		for (let i = 0; i < m2.rowNum; i++) {
			res *= m2[i][i];
		}
		res = Math.round(res * 10000) / 10000;
		return res;
	}
	

}

let mat1 = new Matrix([3, 1, 4, 1, 5, 9, 2, 6, 5], 3, 3);
let mat2 = new Matrix([2, 4, 6, 8, 10, 12, 14, 16, 18], 3, 3);
let mat3 = new Matrix([5, 2, 8], 3, 1);
let mat4 = new Matrix([2, 1, -1, -3, -1, 2, -2, 1, 2], 3, 3);