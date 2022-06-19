import { Table } from "antd";
import { COLUMNS } from "../AssetActions/constant";

export default function DashboardTable({ tableData }) {
  return (
    <Table
      rowClassName={(record, index) =>
        index % 2 === 0 ? "bg-white font-bold" : " bg-light font-bold"
      }
      dataSource={tableData}
      columns={COLUMNS}
      bordered
      pagination={false}
    />
  );
}
