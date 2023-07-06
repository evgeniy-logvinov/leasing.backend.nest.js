import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';

@Entity()
export class CityOfPresenceCustomerCoverageArea {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => City)
  @JoinColumn()
  cities: City;

  @Column()
  zato: boolean;

  //   @ElementCollection
  //     @CollectionTable(name = "cities_of_presence_customer_coverage_area_city", joinColumns = @JoinColumn(name = "cities_of_presence_customer_coverage_area_city_id"))
  //     @Column(name = "city_id")
  //     private Set<Long> cities = new HashSet<>();

  //     @OneToOne(cascade = CascadeType.ALL)
  //     @JoinColumn(name = "city_id", referencedColumnName = "id")
  //     private City city;

  //     @ManyToOne(fetch = FetchType.LAZY)
  //     private PreferenceFilter filter;

  //     @Column(name = "has_zato", columnDefinition = "boolean default false")
  //     private Boolean hasZATO;

  //     @JsonIgnore
  //     public PreferenceFilter getFilter() {
  //         return filter;
  //     }

  //     public void setFilter(PreferenceFilter filter) {
  //         this.filter = filter;
  //     }

  //     public Boolean getHasZATO() {
  //         return hasZATO;
  //     }

  //     public void setHasZATO(Boolean hasZATO) {
  //         this.hasZATO = hasZATO;
  //     }

  //     public City getCity() {
  //         return city;
  //     }

  //     public void setCity(City city) {
  //         this.city = city;
  //     }

  //     public Set<Long> getCities() {
  //         return cities;
  //     }

  //     public void setCities(Set<Long> cities) {
  //         this.cities = cities;
  //     }
  //   @Column()
  //   index: number;
  //   @ManyToOne(() => RegionDictionary)
  //   @JoinColumn()
  //   region: RegionDictionary;
  //   @ManyToOne(() => CityDictionary)
  //   @JoinColumn()
  //   city: CityDictionary;
  //   @Column()
  //   district: string;
  //   // district: DistrictList;
  //   @Column()
  //   street: string;
  //   @Column()
  //   house: string;
  //   @Column()
  //   corpus: string;
  //   @Column()
  //   building: string;
  //   @Column()
  //   litera: string;
  //   @Column()
  //   number: string;
}
