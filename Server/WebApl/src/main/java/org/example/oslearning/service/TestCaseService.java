package org.example.oslearning.service;

import org.example.oslearning.model.TestCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface TestCaseService {

    public List<TestCase> getAllTestCases();

    public Optional<TestCase> getTestCaseById(Long id);

    public List<TestCase> getTestCasesByPracticeId(Long practiceId);

    public TestCase saveTestCase(TestCase testCase);

    public void deleteTestCase(Long id);
}
