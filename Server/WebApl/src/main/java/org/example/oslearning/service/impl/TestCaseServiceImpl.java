package org.example.oslearning.service.impl;

import org.example.oslearning.model.TestCase;
import org.example.oslearning.repository.TestCaseRepository;
import org.example.oslearning.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestCaseServiceImpl implements TestCaseService {

    @Autowired
    private TestCaseRepository testCaseRepository;

    public List<TestCase> getAllTestCases() {
        return testCaseRepository.findAll();
    }

    public Optional<TestCase> getTestCaseById(Long id) {
        return testCaseRepository.findById(id);
    }

    public List<TestCase> getTestCasesByPracticeId(Long practiceId) {
        return testCaseRepository.findByPractice_Id(practiceId);
    }

    public TestCase saveTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    public void deleteTestCase(Long id) {
        testCaseRepository.deleteById(id);
    }
}
