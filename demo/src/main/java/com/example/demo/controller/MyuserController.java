package com.example.demo.controller;

import com.example.demo.entity.Myuser;
import com.example.demo.repository.Myuserrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class MyuserController {


    @Autowired
    private Myuserrepo myuserrepo;  // Injecting the repository to access DB

    // Create a new user (POST)
    @PostMapping
    public ResponseEntity<Myuser> createUser(@RequestBody Myuser myuser) {
        Myuser savedUser = myuserrepo.save(myuser);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get all users (GET)
    @GetMapping
    public List<Myuser> getAllUsers() {
        return myuserrepo.findAll();
    }

    // Get user by id (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Myuser> getUserById(@PathVariable Long id) {
        Optional<Myuser> user = myuserrepo.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update user by id (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Myuser> updateUser(@PathVariable Long id, @RequestBody Myuser myuser) {
        if (!myuserrepo.existsById(id)) {
            return ResponseEntity.notFound().build();  // Return 404 if user doesn't exist
        }
        myuser.setId(id);  // Ensure the ID is set on the update request
        Myuser updatedUser = myuserrepo.save(myuser);  // Save the updated user
        return ResponseEntity.ok(updatedUser);  // Return 200 OK with the updated user
    }

    // Delete user by id (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!myuserrepo.existsById(id)) {
            return ResponseEntity.notFound().build();  // Return 404 if user doesn't exist
        }
        myuserrepo.deleteById(id);  // Delete the user by id
        return ResponseEntity.noContent().build();  // Return 204 No Content if successful
    }
}
