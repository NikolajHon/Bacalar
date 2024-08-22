package org.example.oslearning.controller;

import org.example.oslearning.model.Group;
import org.example.oslearning.model.User;
import org.example.oslearning.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable Long id) {
        Optional<Group> group = groupService.getGroupById(id);
        return group.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {
        if (group.getName() == null || group.getName().toString().length() != 1) {
            return ResponseEntity.badRequest().body(null);
        }

        Group savedGroup = groupService.createGroup(group);
        return ResponseEntity.ok(savedGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody Group groupDetails) {
        Group updatedGroup = groupService.updateGroup(id, groupDetails);
        if (updatedGroup != null) {
            return ResponseEntity.ok(updatedGroup);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/students")
    public List<User> getStudentsByGroupId(@PathVariable Long id) {
        return groupService.getStudentsByGroupId(id);
    }

}
