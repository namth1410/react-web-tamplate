import React from "react";
import styles from "./TableSticky.module.scss";

interface HeadTab {
  key: string;
  label: string;
}

export interface StyledItem {
  key: string;
  style?: React.CSSProperties;
}

interface BorderOptions {
  table?: string;
  row?: string;
  column?: string;
  cell?: string;
}

interface TableStickyProps {
  headTabs: HeadTab[];
  data: Array<Record<string, any>> | null;
  headerStyles?: StyledItem[];
  columnStyles?: StyledItem[];
  borderOptions?: BorderOptions;
  enableHover?: boolean;
  onClickRow?: (rowData: Record<string, any>, rowIndex: number) => void; // Thêm prop này
}

function TableSticky({
  headTabs,
  data,
  headerStyles = [],
  columnStyles = [],
  borderOptions,
  enableHover = true,
  onClickRow,
}: TableStickyProps) {
  return (
    <div className={`${styles.table_scroll} no_scrollbar`}>
      <table>
        <thead>
          <tr>
            {headTabs.map((tab) => {
              const headerStyle =
                headerStyles.find((style) => style.key === tab.key)?.style ||
                {};
              return (
                <th key={tab.key} align="center" style={headerStyle}>
                  {tab.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item.index}
              style={{
                border: borderOptions?.row,
                cursor: enableHover ? "pointer" : undefined,
              }}
              className={enableHover ? styles.hover : undefined}
              onClick={() => {
                if (onClickRow) {
                  onClickRow(item, index); // Gọi hàm onClickRow khi click
                }
              }}
            >
              {headTabs.map((tab) => {
                const columnStyle =
                  columnStyles.find((style) => style.key === tab.key)?.style ||
                  {};
                return (
                  <td key={tab.key} style={columnStyle}>
                    {item[tab.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSticky;
