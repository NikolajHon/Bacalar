package org.example.oslearning.service;

import org.example.oslearning.model.Group;
import org.example.oslearning.model.User;

import java.util.List;
import java.util.Optional;

public interface GroupService {
    List<Group> getAllGroups();

    Optional<Group> getGroupById(Long id);

    Group createGroup(Group group);

    Group updateGroup(Long id, Group groupDetails);

    void deleteGroup(Long id);
    List<User>getStudentsByGroupId(Long groupId);
}
