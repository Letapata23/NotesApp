package com.letapata.notes_management_system.dto;

public class NoteDTO {
    private Long id;
    private String title;
    private String text;

    public NoteDTO(){
        this.title = "";
        this.text = "";
    }

    public NoteDTO(Long id, String title, String text){
        this.id = id;
        this.title = title;
        this.text = text;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return this.id;
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
