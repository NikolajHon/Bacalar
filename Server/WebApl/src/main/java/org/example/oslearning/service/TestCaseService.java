package org.example.oslearning.service;

import org.example.oslearning.model.TestCase;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TestCaseService {

    public List<TestCase> getTestCases() {
        return List.of(
                new TestCase("5 3", "8\n"),
                new TestCase("10 20", "30\n"),
                new TestCase("0 0", "0\n"),
                new TestCase("-5 -3", "-8\n"),
                new TestCase("100 200", "300\n")
        );
    }
}
