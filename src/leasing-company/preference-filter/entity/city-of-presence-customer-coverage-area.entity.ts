import { City } from 'src/dictionaries/entity/city.entity';
import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PreferenceFilter } from './preference-filter.entity';

@Entity()
export class CityOfPresenceCustomerCoverageArea extends LeasingEntity {
  @ManyToOne(() => City)
  cities: City;

  @ManyToOne(() => City)
  сustomerCoverageArea: City;

  @Column()
  zato: boolean;

  @ManyToOne(
    () => PreferenceFilter,
    (item) => item.cityOfPresenceCustomerCoverageArea,
  )
  preferenceFilter: PreferenceFilter;
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
