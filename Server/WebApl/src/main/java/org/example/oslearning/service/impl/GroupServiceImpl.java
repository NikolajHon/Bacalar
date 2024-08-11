package org.example.oslearning.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.example.oslearning.model.Group;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.GroupRepository;
import org.example.oslearning.repository.UserRepository;
import org.example.oslearning.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
