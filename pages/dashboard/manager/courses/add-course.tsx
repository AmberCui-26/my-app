import AppLayout from "../../../../component/layout/layout";
import AddCourseForm from "../../../../component/addCourse/addCourseForm";
import CourseScheduleForm from "../../../../component/addCourse/courseScheduleForm";
import { useState } from "react";
import { Steps } from "antd";
import { Button, Result } from "antd";
import router from "next/router";
import Link from "next/link";

const { Step } = Steps;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [availableStep, setAvailableStep] = useState<number[]>([0]);
  const [courseId, setCourseId] = useState<number>();
  const [scheduleId, setScheduleId] = useState<number>();

  const steps = [
    <AddCourseForm
      onSuccess={(course) => {
        setCourseId(course.id);
        setScheduleId(course.scheduleId);
        setCurrent(current + 1);
        setAvailableStep([...availableStep, current + 1]);
      }}
    />,
    <CourseScheduleForm
      courseId={courseId}
      scheduleId={scheduleId}
      onSuccess={() => {
        setCurrent(current + 1);
        setAvailableStep([...availableStep, current + 1]);
      }}
    />,
    <Result
      status="success"
      title="Successfully Create Course!"
      extra={[
        <div>
          <Link href={"/dashboard/manager/courses/" + courseId}>
            <Button type="primary">Go Course</Button>
          </Link>
          <Button
            onClick={() => {
              router.reload();
            }}
          >
            Create Again
          </Button>
        </div>,
      ]}
    />,
  ];

  return (
    <AppLayout>
      <Steps
        type="navigation"
        current={current}
        style={{ marginLeft: "12px", marginBottom: "20px" }}
        onChange={(step) => {
          if (availableStep.includes(step)) {
            setCurrent(step);
          }
        }}
      >
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>
      {steps.map((content, index) => (
        <div
          key={index}
          style={{ display: index === current ? "block" : "none" }}
        >
          {content}
        </div>
      ))}
    </AppLayout>
  );
}
