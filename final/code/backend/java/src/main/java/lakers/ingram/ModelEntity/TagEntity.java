package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tag", schema = "canteen", catalog = "")
public class TagEntity {
    private int tagId;
    private String tagName;
    private String tagType;

    public TagEntity(){}

    public TagEntity(String tagType,String tagName){
        this.tagName=tagName;
        this.tagType=tagType;
    }

    @Id
    @Column(name = "tagID", nullable = false)
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Basic
    @Column(name = "tagName", nullable = true, length = 45)
    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    @Basic
    @Column(name = "tagType", nullable = true, length = 45)
    public String getTagType() {
        return tagType;
    }

    public void setTagType(String tagType) {
        this.tagType = tagType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TagEntity tagEntity = (TagEntity) o;
        return tagId == tagEntity.tagId &&
                Objects.equals(tagName, tagEntity.tagName) &&
                Objects.equals(tagType, tagEntity.tagType);
    }

    @Override
    public int hashCode() {

        return Objects.hash(tagId, tagName, tagType);
    }
}
