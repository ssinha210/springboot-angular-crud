package com.example.demo.repository;

import com.example.demo.entity.Myuser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Myuserrepo extends JpaRepository<Myuser, Long> {
}
