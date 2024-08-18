package org.example.oslearning.repository;

import org.example.oslearning.model.Practice;
import org.example.oslearning.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    List<TestCase> findByPractice(Practice practice);

    List<TestCase> findByPractice_Id(Long practiceId);
}
