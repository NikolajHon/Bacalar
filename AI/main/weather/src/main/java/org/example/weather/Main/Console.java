package org.example.weather.Main;

import org.example.weather.Entity.History;
import org.example.weather.Entity.Person;
import org.example.weather.Server.WeatherService;
import org.example.weather.Services.HistoryPackage.HistoryService;
import org.example.weather.Services.PersonPackage.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Scanner;
@Component
public class Console {
    @Autowired
    private HistoryService historyService;
    @Autowired
    private PersonService personService;
    public void start(){
        personService.addPerson(new Person("Kolya", "11111111"));
        List<Person> persons = personService.getPersons();
        System.out.println(persons);
        while (true) {
            System.out.println("Plese input name of city");
            Scanner scanner = new Scanner(System.in);
            String city = scanner.nextLine();
            WeatherService weatherService = new WeatherService();
            History history = weatherService.getWeather(city);
            historyService.addParam(history);
        }

    }
}
