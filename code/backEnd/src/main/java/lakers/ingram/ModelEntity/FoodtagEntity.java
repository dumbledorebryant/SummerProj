package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "foodtag", schema = "summerproj", catalog = "")
@IdClass(FoodtagEntityPK.class)
public class FoodtagEntity implements Serializable {
    private int tagId;
    private int foodId;

    @Id
    @Column(name = "tagID", nullable = false)
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Id
    @Column(name = "foodID", nullable = false)
    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FoodtagEntity that = (FoodtagEntity) o;

        if (tagId != that.tagId) return false;
        if (foodId != that.foodId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = tagId;
        result = 31 * result + foodId;
        return result;
    }
}
