import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  // @Id
  // @GeneratedValue(strategy = GenerationType.AUTO)
  // private Long id;

  // @Column(name = "name")
  // private String name;

  // @ManyToOne(fetch = FetchType.LAZY)
  // private District district;

  // @OneToMany(fetch = FetchType.LAZY, mappedBy = "city")
  // private Set<Area> areas;

  // public String getName() {
  //     return name;
  // }

  // public void setName(String name) {
  //     this.name = name;
  // }

  // public Long getId() {
  //     return id;
  // }

  // public void setId(Long id) {
  //     this.id = id;
  // }

  // @JsonIgnore
  // public District getDistrict() {
  //     return district;
  // }

  // public void setDistrict(District district) {
  //     this.district = district;
  // }

  // public Set<Area> getAreas() {
  //     return areas;
  // }

  // public Set<Street> getStreets() {
  //     return areas
  //             .stream()
  //             .flatMap(x -> x.getStreets().stream())
  //             .collect(Collectors.toSet());
  // }

  // public void setAreas(Set<Area> areas) {
  //     this.areas = areas;
  // }
}
