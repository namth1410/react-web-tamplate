import { ConfigProvider, Pagination } from "antd";
import { useEffect, useState } from "react";
import { PaginationMetadata } from "types/apiTypes";
import { Nullable } from "types/common";

interface PaginationCusProps {
  metadataPage: Nullable<PaginationMetadata>;
  onClick: (pageParam: { page: number; pageSize: number }) => void; // Kiểu cho onClick
  styles?: React.CSSProperties; // Kiểu cho styles
  align?: "center" | "start" | "end";
}

const PaginationCus: React.FC<PaginationCusProps> = ({
  metadataPage,
  onClick = () => {},
  styles,
  align,
}) => {
  const [paginationSize, setPaginationSize] = useState({
    fontSize: 14,
    itemSize: 32,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 3600) {
        setPaginationSize({ fontSize: 28, itemSize: 70 });
      } else if (width >= 2400) {
        setPaginationSize({ fontSize: 18, itemSize: 40 });
      } else {
        setPaginationSize({ fontSize: 14, itemSize: 32 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!metadataPage) {
    return null; // Trả về null nếu không có dữ liệu
  }

  const { current_page, number_of_items, page_size } = metadataPage;

  const handleClickPageButton = (page: number) => {
    const pageParam = { page: page - 1, pageSize: page_size };
    onClick(pageParam);
  };

  return (
    <div style={{ ...styles }}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: paginationSize.fontSize,
          },
          components: {
            Pagination: {
              itemSize: paginationSize.itemSize,
            },
          },
        }}
      >
        <Pagination
          pageSize={page_size}
          current={current_page + 1}
          defaultCurrent={1}
          total={number_of_items}
          onChange={handleClickPageButton}
          align={align ?? "end"}
          hideOnSinglePage
          showSizeChanger={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default PaginationCus;
