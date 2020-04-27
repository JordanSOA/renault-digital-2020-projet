package com.renault.services;

import com.renault.dtos.RoleDto;
import com.renault.models.Car;
import com.renault.models.Role;
import com.renault.models.User;
import com.renault.repositories.CarsRepository;
import com.renault.repositories.RoleRepository;
import com.renault.repositories.UserRepository;
import com.renault.service.CarsDatabaseInsert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    /*
    @Autowired
    private CarsRepository carsRepository;

    @Override
    @Transactional
    public void deleteAll() {
        carsRepository.deleteAll();
    }

    @Override
    @Transactional
    public void insertData() {
        insertUsers();
        insertCars();
    }

    private void insertUsers() {
        // TODO insert a USER role and a ADMIN role
        // TODO insert a admin user with the "supermotdepasse1!" password
    }

    private void insertCars() {
        for (Car car : getCars()) {
            carsRepository.save(car);
        }
    }

    private List<Car> getCars() {
        List<Car> cars = new ArrayList<>();
        for (String line : getCarsFromCsvFile()) {
            String[] column = line.split(";");
            String carBrand = column[0].replace("\"", "");
            String carModel = column[1].replace("\"", "").strip();
            Car car = new Car(carBrand, carModel);
            cars.add(car);
        }
        return cars;
    }

    private List<String> getCarsFromCsvFile() {
        InputStream resource = ApplicationServiceImpl.class.getResourceAsStream("cars.csv");
        return new BufferedReader(new InputStreamReader(resource)).lines().collect(toList());
    }
    */

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void deleteAll() {
        roleRepository.deleteAll();
        userRepository.deleteAll();
        carsRepository.deleteAll();
    }

    @Override
    @Transactional
    public void insertData() {
        insertUsers();
        insertCars();
    }

    private void insertUsers() {
        // TODO insert a USER role and a ADMIN role
        Role roleUser = new Role("USER");
        Role roleAdmin = new Role("ADMIN");

        roleRepository.save(roleUser);
        roleRepository.save(roleAdmin);
        // TODO insert a admin user with the "supermotdepasse1!" password
        User userAdmin = new User("adminUser", passwordEncoder.encode("supermotdepasse1!"), List.of(roleUser) ,true);
        userRepository.save(userAdmin);
    }

    private void insertCars() {
        for (Car car : getCars()) {
            carsRepository.save(car);
        }
    }

    private List<Car> getCars() {
        List<Car> cars = new ArrayList<>();
        for (String line : getCarsFromCsvFile()) {
            String[] column = line.split(";");
            String carBrand = column[0].replace("\"", "");
            String carModel = column[1].replace("\"", "").strip();
            Car car = new Car(carBrand, carModel);
            cars.add(car);
        }
        return cars;
    }

    private List<String> getCarsFromCsvFile() {
        InputStream resource = CarsDatabaseInsert.class.getResourceAsStream("cars.csv");
        return new BufferedReader(new InputStreamReader(resource)).lines().collect(toList());
    }
}
