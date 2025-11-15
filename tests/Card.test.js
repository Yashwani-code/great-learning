import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import Card from "../components/Card";

const renderWithTheme = (ui) =>
  render(<PaperProvider>{ui}</PaperProvider>);

const sampleActivity = {
  id: "1",
  title: "React Native Fundamentals – Kickoff",
  type: "Online Class",
  status: "Not Started",
  date: "2025-11-10",
  time: "07:00 PM",
  instructor: "Ananya Gupta",
  duration: "75 mins",
  description:
    "Overview of the React Native ecosystem, core components, and project structure.",
};

describe("Card Component", () => {
  it("renders the activity title", () => {
    const { getByText } = renderWithTheme(
      <Card activity={sampleActivity} onActionPress={() => {}} />
    );

    expect(getByText("React Native Fundamentals – Kickoff")).toBeTruthy();
  });

  it("shows the activity type", () => {
    const { getByText } = renderWithTheme(
      <Card activity={sampleActivity} onActionPress={() => {}} />
    );

    expect(getByText("Online Class")).toBeTruthy();
  });

  it("shows instructor for Online Class", () => {
    const { getByText } = renderWithTheme(
      <Card activity={sampleActivity} onActionPress={() => {}} />
    );

    expect(getByText("Ananya Gupta")).toBeTruthy();
  });

  it("renders description text", () => {
    const { getByText } = renderWithTheme(
      <Card activity={sampleActivity} onActionPress={() => {}} />
    );

    expect(
      getByText(/Overview of the React Native ecosystem/i)
    ).toBeTruthy();
  });

  it("shows correct action label for 'Not Started' status", () => {
    const { getByText } = renderWithTheme(
      <Card activity={sampleActivity} onActionPress={() => {}} />
    );

    expect(getByText("Start")).toBeTruthy();
  });

  it("shows correct action label for 'In Progress' status", () => {
    const inProgress = { ...sampleActivity, status: "In Progress" };

    const { getByText } = renderWithTheme(
      <Card activity={inProgress} onActionPress={() => {}} />
    );

    expect(getByText("Continue")).toBeTruthy();
  });

  it("shows correct label for completed activity", () => {
    const completed = { ...sampleActivity, status: "Completed" };

    const { getByText } = renderWithTheme(
      <Card activity={completed} onActionPress={() => {}} />
    );

    expect(getByText("Review")).toBeTruthy();
  });

  it("handles button press correctly", () => {
    const onPressMock = jest.fn();

    const { getByText } = renderWithTheme(
      <ActivityCard activity={sampleActivity} onActionPress={onPressMock} />
    );

    fireEvent.press(getByText("Start"));

    expect(onPressMock).toHaveBeenCalled();
    expect(onPressMock).toHaveBeenCalledWith(sampleActivity);
  });

  it("renders quiz metadata when activity is Quiz", () => {
    const quizActivity = {
      id: "2",
      title: "State & Props Mini Quiz",
      type: "Quiz",
      status: "Not Started",
      date: "2025-11-11",
      time: "08:30 PM",
      duration: "20 mins",
      questions: 10,
      description:
        "Short assessment to check your understanding of state, props, and rendering.",
    };

    const { getByText } = renderWithTheme(
      <Card activity={quizActivity} onActionPress={() => {}} />
    );

    expect(getByText("10 Questions")).toBeTruthy();
  });

  it("renders score for completed quiz", () => {
    const completedQuiz = {
      id: "7",
      title: "Advanced Quiz: Performance & Optimization",
      type: "Quiz",
      status: "Completed",
      date: "2025-11-03",
      time: "08:00 PM",
      duration: "30 mins",
      questions: 15,
      score: "88%",
      description: "Quiz focused on performance techniques.",
    };

    const { getByText } = renderWithTheme(
      <Card activity={completedQuiz} onActionPress={() => {}} />
    );

    expect(getByText("88%")).toBeTruthy();
  });
});
