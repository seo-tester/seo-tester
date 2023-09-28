import Analyzer from './analyzer';
import { json2csv } from 'json-2-csv';
import * as fs from 'fs/promises';
import path from 'path';

class Output {
  constructor() {
    this.analyzer = new Analyzer();
  }

  /**
   * @param {Array} data - List of files and folders
   * @param {Array} rules - List of rules
   * @returns {Promise} - Returns js object [{file, report}, ...]
   */
  async object(inputData, rules) {
    const report = await this.analyzer.run(inputData, rules);
    return report;
  }

  /**
   * @param {Array} data - List of files and folders
   * @param {Array} rules - List of rules
   * @returns {JSON} - Returns json [{"file", "report"}, ...]
   */
  async json(inputData, rules) {
    const report = await this.analyzer.run(inputData, rules);
    return JSON.stringify(report, null, 2);
  }

  /**
   * @param {Array} data - List of files and folders
   * @param {Array} rules - List of rules
   * @returns {JSON} - Returns csv file path: report.csv
   */
  async csv(inputData, rules, reportPath) {
    const report = await this.analyzer.run(inputData, rules);
    report.map(
      v => {
        let value = {};
        v.report.forEach(
          (item, index) => {value['issue_' + index] = item;}
        );
        v.report = value;
        return v;
      }
    );
    const content = await json2csv(report, {excludeKeys: null});
    
    if (reportPath === undefined) {
      reportPath = path.join(__dirname,  'report.csv');
    }

    try {
      await fs.writeFile(reportPath, content);
    } catch (err) {
      console.log(err);
    }
    return reportPath;
  }
}

export default Output;
