import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async insert(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
      `;
    return this.pool.query(query);
  }

  async update(column, value, clause) {
    const query = `UPDATE ${this.table}
                 SET ${column} = '${value}' 
                WHERE ${clause}`;
    return this.pool.query(query);
  }

  async updateWithReturn(column, value, clause) {
    const query = `UPDATE ${this.table}
                 SET ${column} = '${value}' 
                WHERE ${clause}
                RETURNING *`;
    return this.pool.query(query);
  }

  async delete(clause) {
    const query = `DELETE FROM ${this.table} WHERE ${clause}`;
    return this.pool.query(query);
  }
}

export default Model;
