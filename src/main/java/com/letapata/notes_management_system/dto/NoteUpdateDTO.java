package com.letapata.notes_management_system.dto;

public class NoteUpdateDTO {
    private String title;
    private String text;

    public NoteUpdateDTO(){
        this.title = "";
        this.text = "";
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getTitle(){
        return this.title;
    }

    public void setText(String text){
        this.text = text;
    }

    public String getText(){
        return this.text;
    }

}
