import AppLayout from "../../../../component/layout/layout";
import CourseCard from "../../../../component/courseCard/cardLayout";
import { getCourseInfo } from "../../../../lib/services/apiService";
import { useCallback, useEffect, useState } from "react";
import { List, Skeleton, Divider, BackTop, Button } from "antd";
import { CoursesResponse } from "../../../../lib/modal/response";
import InfiniteScroll from "react-infinite-scroll-component";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";

export default function FirstPost() {
  const [courseInfo, setCourseInfo] = useState<CoursesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    const params = { page: page, limit: 20 };
    getCourseInfo(params)
      .then((res) => {
        setTotal(res.data.data.total);
        setCourseInfo([...courseInfo, ...res.data.data.courses]);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return (
    <AppLayout>
      <div
        id="scrollableDiv"
        style={{
          backgroundColor: "#fff",
          margin: "20px",
          height: "100vh",
          overflow: "scroll",
        }}
      >
        <InfiniteScroll
          dataLength={courseInfo.length}
          next={() => setPage(page + 1)}
          hasMore={courseInfo.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>No More Course!</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 14,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={courseInfo}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <CourseCard {...item}>
                  <Link href={"/dashboard/manager/courses/" + item.id}>
                    <Button style={{ marginTop: "15px" }} type="primary">
                      Read More
                    </Button>
                  </Link>
                </CourseCard>
              </List.Item>
            )}
          />
        </InfiniteScroll>
        <BackTop
          visibilityHeight={200}
          target={() => {
            return document.getElementById("scrollableDiv");
          }}
          style={{
            fontSize: "40px",
            color: "#fff",
            right: "15px",
            backgroundColor: "#DDDDDD",
          }}
        >
          <VerticalAlignTopOutlined />
        </BackTop>
      </div>
    </AppLayout>
  );
}
