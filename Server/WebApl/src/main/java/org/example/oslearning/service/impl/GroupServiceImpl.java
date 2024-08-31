package org.example.oslearning.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.example.oslearning.model.Group;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.GroupRepository;
import org.example.oslearning.repository.UserRepository;
import org.example.oslearning.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public Optional<Group> getGroupById(Long id) {
        return groupRepository.findById(id);
    }

    @Override
    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    @Override
    public Group updateGroup(Long id, Group groupDetails) {
        Optional<Group> optionalGroup = groupRepository.findById(id);
        if (optionalGroup.isPresent()) {
            Group group = optionalGroup.get();
            group.setName(groupDetails.getName());
            return groupRepository.save(group);
        }
        return null; // или выбросить исключение, если группа не найдена
    }

    @Override
    public void deleteGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        for (User user : group.getStudents()) {
            user.setGroup(null);
            userRepository.save(user);
        }

        groupRepository.deleteById(groupId);
    }
    @Override
    public List<User> getStudentsByGroupId(Long groupId) {
        Optional<Group> groupOptional = groupRepository.findById(groupId);

        if (groupOptional.isPresent()) {
            Group group = groupOptional.get();
            return new ArrayList<>(group.getStudents());
        } else {
            throw new RuntimeException("Group not found");
        }
    }
    @Override
    public boolean removeStudentFromGroup(Long groupId, Long studentId) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getGroup() != null && user.getGroup().getId().equals(groupId)) {
                user.setGroup(null); // Удаляем пользователя из группы
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

}
